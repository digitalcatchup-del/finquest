-- Butterfly Dynamix — Inventory & Warehouse Management Module
-- Enterprise-grade inventory with AI-powered forecasting
-- Migration v1: Core tables for multi-location inventory

-- 1) WAREHOUSES / LOCATIONS
create table if not exists public.bk_warehouses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete cascade,
  warehouse_name text not null,
  warehouse_code text unique,
  warehouse_type text default 'main' check (warehouse_type in ('main', 'retail', 'wholesale', 'damaged', 'returns', 'transit')),
  address text,
  city text,
  state text,
  country text default 'Nigeria',
  contact_person text,
  contact_phone text,
  contact_email text,
  is_active boolean not null default true,
  is_default boolean not null default false,
  capacity_units numeric(14,3) default 0,
  current_utilization numeric(5,2) default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_bk_warehouses_user on public.bk_warehouses(user_id);
create index if not exists idx_bk_warehouses_business on public.bk_warehouses(business_id);
create unique index if not exists idx_bk_warehouses_code on public.bk_warehouses(warehouse_code) where warehouse_code is not null;

-- 2) PRODUCT-WAREHOUSE STOCK LEVELS (multi-location inventory)
create table if not exists public.bk_product_stock (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete cascade,
  product_id uuid not null references public.bk_products(id) on delete cascade,
  warehouse_id uuid not null references public.bk_warehouses(id) on delete cascade,
  quantity_on_hand numeric(14,3) not null default 0,
  quantity_reserved numeric(14,3) not null default 0,
  quantity_available numeric(14,3) generated always as (quantity_on_hand - quantity_reserved) stored,
  reorder_level numeric(14,3) not null default 10,
  reorder_quantity numeric(14,3) not null default 100,
  bin_location text,
  last_counted_at timestamptz,
  last_received_at timestamptz,
  last_sold_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz default now(),
  unique (product_id, warehouse_id)
);
create index if not exists idx_bk_product_stock_product on public.bk_product_stock(product_id);
create index if not exists idx_bk_product_stock_warehouse on public.bk_product_stock(warehouse_id);
create index if not exists idx_bk_product_stock_low_stock on public.bk_product_stock(quantity_available, reorder_level) where quantity_available <= reorder_level;

-- 3) STOCK MOVEMENTS (complete audit trail)
create table if not exists public.bk_stock_movements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete cascade,
  product_id uuid not null references public.bk_products(id) on delete cascade,
  warehouse_id uuid not null references public.bk_warehouses(id) on delete cascade,
  movement_type text not null check (movement_type in ('receipt', 'sale', 'adjustment', 'transfer_in', 'transfer_out', 'return', 'damage', 'write_off', 'count_correction')),
  quantity numeric(14,3) not null,
  quantity_before numeric(14,3) not null,
  quantity_after numeric(14,3) not null,
  unit_cost numeric(14,2) not null default 0,
  total_value numeric(16,2) generated always as (quantity * unit_cost) stored,
  reference_type text, -- 'purchase_order', 'sales_order', 'journal', 'transfer', 'manual'
  reference_id uuid,
  batch_number text,
  serial_numbers jsonb default '[]'::jsonb,
  expiry_date date,
  narration text,
  performed_by uuid references auth.users(id),
  approved_by uuid references auth.users(id),
  approval_status text default 'approved' check (approval_status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);
create index if not exists idx_bk_stock_movements_product on public.bk_stock_movements(product_id);
create index if not exists idx_bk_stock_movements_warehouse on public.bk_stock_movements(warehouse_id);
create index if not exists idx_bk_stock_movements_type on public.bk_stock_movements(movement_type);
create index if not exists idx_bk_stock_movements_reference on public.bk_stock_movements(reference_type, reference_id);
create index if not exists idx_bk_stock_movements_created on public.bk_stock_movements(created_at desc);

-- 4) BATCHES / LOTS TRACKING
create table if not exists public.bk_batches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete cascade,
  product_id uuid not null references public.bk_products(id) on delete cascade,
  warehouse_id uuid not null references public.bk_warehouses(id) on delete cascade,
  batch_number text not null,
  manufacture_date date,
  expiry_date date,
  quantity_received numeric(14,3) not null default 0,
  quantity_remaining numeric(14,3) not null default 0,
  unit_cost numeric(14,2) not null default 0,
  supplier_id uuid,
  status text default 'active' check (status in ('active', 'expired', 'recalled', 'depleted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz default now(),
  unique (batch_number, product_id, warehouse_id)
);
create index if not exists idx_bk_batches_product on public.bk_batches(product_id);
create index if not exists idx_bk_batches_expiry on public.bk_batches(expiry_date) where expiry_date is not null;
create index if not exists idx_bk_batches_status on public.bk_batches(status);

-- 5) SERIAL NUMBERS TRACKING
create table if not exists public.bk_serial_numbers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete cascade,
  product_id uuid not null references public.bk_products(id) on delete cascade,
  warehouse_id uuid references public.bk_warehouses(id) on delete cascade,
  serial_number text not null,
  status text default 'in_stock' check (status in ('in_stock', 'sold', 'returned', 'damaged', 'lost', 'in_repair')),
  purchase_date date,
  sale_date date,
  customer_id uuid,
  warranty_start date,
  warranty_end date,
  supplier_id uuid,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz default now(),
  unique (serial_number, product_id)
);
create index if not exists idx_bk_serial_numbers_product on public.bk_serial_numbers(product_id);
create index if not exists idx_bk_serial_numbers_status on public.bk_serial_numbers(status);
create index if not exists idx_bk_serial_numbers_warranty on public.bk_serial_numbers(warranty_end) where warranty_end is not null;

-- 6) TRANSFER ORDERS (inter-warehouse transfers)
create table if not exists public.bk_transfer_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete cascade,
  transfer_number text not null unique,
  from_warehouse_id uuid not null references public.bk_warehouses(id) on delete cascade,
  to_warehouse_id uuid not null references public.bk_warehouses(id) on delete cascade,
  status text default 'draft' check (status in ('draft', 'requested', 'approved', 'in_transit', 'received', 'cancelled')),
  requested_by uuid references auth.users(id),
  approved_by uuid references auth.users(id),
  shipped_at timestamptz,
  received_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_bk_transfer_orders_from on public.bk_transfer_orders(from_warehouse_id);
create index if not exists idx_bk_transfer_orders_to on public.bk_transfer_orders(to_warehouse_id);
create index if not exists idx_bk_transfer_orders_status on public.bk_transfer_orders(status);

create table if not exists public.bk_transfer_items (
  id uuid primary key default gen_random_uuid(),
  transfer_id uuid not null references public.bk_transfer_orders(id) on delete cascade,
  product_id uuid not null references public.bk_products(id) on delete cascade,
  quantity numeric(14,3) not null default 0,
  quantity_shipped numeric(14,3) default 0,
  quantity_received numeric(14,3) default 0,
  batch_number text,
  serial_numbers jsonb default '[]'::jsonb,
  unit_cost numeric(14,2) default 0,
  created_at timestamptz not null default now()
);
create index if not exists idx_bk_transfer_items_transfer on public.bk_transfer_items(transfer_id);
create index if not exists idx_bk_transfer_items_product on public.bk_transfer_items(product_id);

-- 7) REORDER ALERTS & PURCHASE REQUISITIONS
create table if not exists public.bk_reorder_alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete cascade,
  product_id uuid not null references public.bk_products(id) on delete cascade,
  warehouse_id uuid references public.bk_warehouses(id) on delete cascade,
  current_stock numeric(14,3) not null,
  reorder_level numeric(14,3) not null,
  suggested_quantity numeric(14,3) not null,
  predicted_demand numeric(14,3), -- AI forecast
  confidence_score numeric(3,2), -- AI confidence 0-1
  alert_status text default 'new' check (alert_status in ('new', 'acknowledged', 'reordered', 'dismissed')),
  ai_generated boolean not null default false,
  created_at timestamptz not null default now(),
  acknowledged_at timestamptz,
  reordered_at timestamptz
);
create index if not exists idx_bk_reorder_alerts_status on public.bk_reorder_alerts(alert_status);
create index if not exists idx_bk_reorder_alerts_product on public.bk_reorder_alerts(product_id);

-- 8) INVENTORY COUNTS (Stocktakes)
create table if not exists public.bk_inventory_counts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete cascade,
  warehouse_id uuid not null references public.bk_warehouses(id) on delete cascade,
  count_number text not null unique,
  status text default 'scheduled' check (status in ('scheduled', 'in_progress', 'completed', 'cancelled')),
  scheduled_date date,
  started_at timestamptz,
  completed_at timestamptz,
  counted_by uuid references auth.users(id),
  approved_by uuid references auth.users(id),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_bk_inventory_counts_warehouse on public.bk_inventory_counts(warehouse_id);
create index if not exists idx_bk_inventory_counts_status on public.bk_inventory_counts(status);

create table if not exists public.bk_inventory_count_items (
  id uuid primary key default gen_random_uuid(),
  count_id uuid not null references public.bk_inventory_counts(id) on delete cascade,
  product_id uuid not null references public.bk_products(id) on delete cascade,
  warehouse_id uuid not null references public.bk_warehouses(id) on delete cascade,
  system_quantity numeric(14,3) not null,
  counted_quantity numeric(14,3) not null,
  variance numeric(14,3) generated always as (counted_quantity - system_quantity) stored,
  variance_reason text,
  batch_number text,
  counted_at timestamptz,
  counted_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_bk_inventory_count_items_count on public.bk_inventory_count_items(count_id);
create index if not exists idx_bk_inventory_count_items_product on public.bk_inventory_count_items(product_id);
create index if not exists idx_bk_inventory_count_items_variance on public.bk_inventory_count_items(variance) where abs(variance) > 0;

-- 9) AI DEMAND FORECASTING DATA
create table if not exists public.bk_demand_forecasts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete cascade,
  product_id uuid not null references public.bk_products(id) on delete cascade,
  warehouse_id uuid references public.bk_warehouses(id) on delete cascade,
  forecast_date date not null,
  forecast_period text not null, -- 'daily', 'weekly', 'monthly'
  predicted_demand numeric(14,3) not null,
  confidence_interval_lower numeric(14,3),
  confidence_interval_upper numeric(14,3),
  model_version text,
  actual_demand numeric(14,3),
  accuracy_score numeric(5,4),
  features_used jsonb, -- seasonality, trends, promotions, etc.
  created_at timestamptz not null default now(),
  unique (product_id, warehouse_id, forecast_date, forecast_period)
);
create index if not exists idx_bk_demand_forecasts_product on public.bk_demand_forecasts(product_id);
create index if not exists idx_bk_demand_forecasts_date on public.bk_demand_forecasts(forecast_date);

-- 10) VALUATION METHODS CONFIGURATION
alter table public.bk_products add column if not exists valuation_method text default 'fifo' check (valuation_method in ('fifo', 'lifo', 'weighted_average', 'specific_identification'));
alter table public.bk_products add column if not exists track_batches boolean not null default false;
alter table public.bk_products add column if not exists track_serials boolean not null default false;
alter table public.bk_products add column if not exists shelf_life_days integer;
alter table public.bk_products add column if not exists abc_category text default 'C' check (abc_category in ('A', 'B', 'C')); -- ABC analysis
alter table public.bk_products add column if not exists average_daily_sales numeric(14,3) default 0;
alter table public.bk_products add column if not exists lead_time_days integer default 7;

-- Add barcode index for faster lookups
create index if not exists idx_bk_products_barcode on public.bk_products(barcode) where barcode is not null;
create index if not exists idx_bk_products_business on public.bk_products(business_id);

-- 11) HELPER FUNCTIONS
create or replace function public.update_bk_stock_levels() returns trigger language plpgsql as $$
begin
  if TG_OP = 'INSERT' then
    update public.bk_product_stock
    set quantity_on_hand = quantity_on_hand + new.quantity,
        last_received_at = case when new.movement_type in ('receipt', 'return') then new.created_at else last_received_at end,
        last_sold_at = case when new.movement_type = 'sale' then new.created_at else last_sold_at end,
        updated_at = now()
    where product_id = new.product_id and warehouse_id = new.warehouse_id;
    
    insert into public.bk_product_stock (user_id, business_id, product_id, warehouse_id, quantity_on_hand, last_received_at)
    select new.user_id, new.business_id, new.product_id, new.warehouse_id, new.quantity,
           case when new.movement_type in ('receipt', 'return') then new.created_at else null end
    where not exists (select 1 from public.bk_product_stock where product_id = new.product_id and warehouse_id = new.warehouse_id);
    
  elsif TG_OP = 'DELETE' then
    update public.bk_product_stock
    set quantity_on_hand = quantity_on_hand - old.quantity,
        updated_at = now()
    where product_id = old.product_id and warehouse_id = old.warehouse_id;
  end if;
  
  return coalesce(new, old);
end; $$;

drop trigger if exists trg_update_stock_levels on public.bk_stock_movements;
create trigger trg_update_stock_levels
after insert or delete on public.bk_stock_movements
for each row execute function public.update_bk_stock_levels();

-- Auto-generate warehouse code
create or replace function public.generate_warehouse_code() returns trigger language plpgsql as $$
begin
  if new.warehouse_code is null then
    new.warehouse_code := upper(substring(replace(new.warehouse_name, ' ', '_') from 1 for 3)) || '-' || substr(new.id::text, 1, 4);
  end if;
  return new;
end; $$;

drop trigger if exists trg_generate_warehouse_code on public.bk_warehouses;
create trigger trg_generate_warehouse_code
before insert on public.bk_warehouses
for each row execute function public.generate_warehouse_code();

-- Auto-create default warehouse for new businesses
create or replace function public.create_default_warehouse() returns trigger language plpgsql as $$
begin
  insert into public.bk_warehouses (user_id, business_id, warehouse_name, warehouse_type, is_default)
  values (new.owner_user_id, new.id, 'Main Warehouse', 'main', true)
  on conflict do nothing;
  return new;
end; $$;

drop trigger if exists trg_create_default_warehouse on public.businesses;
create trigger trg_create_default_warehouse
after insert on public.businesses
for each row execute function public.create_default_warehouse();

-- RLS Policies
alter table public.bk_warehouses enable row level security;
alter table public.bk_product_stock enable row level security;
alter table public.bk_stock_movements enable row level security;
alter table public.bk_batches enable row level security;
alter table public.bk_serial_numbers enable row level security;
alter table public.bk_transfer_orders enable row level security;
alter table public.bk_transfer_items enable row level security;
alter table public.bk_reorder_alerts enable row level security;
alter table public.bk_inventory_counts enable row level security;
alter table public.bk_inventory_count_items enable row level security;
alter table public.bk_demand_forecasts enable row level security;

do $$
declare t text;
begin
  foreach t in array array[
    'bk_warehouses','bk_product_stock','bk_stock_movements','bk_batches','bk_serial_numbers',
    'bk_transfer_orders','bk_transfer_items','bk_reorder_alerts','bk_inventory_counts','bk_inventory_count_items','bk_demand_forecasts'
  ] loop
    execute format('drop policy if exists "own rows all" on public.%I', t);
    execute format('create policy "own rows all" on public.%I for all using (auth.uid() = user_id or exists (select 1 from public.user_businesses ub where ub.business_id = %I.business_id and ub.user_id = auth.uid())) with check (auth.uid() = user_id or exists (select 1 from public.user_businesses ub where ub.business_id = %I.business_id and ub.user_id = auth.uid()))', t, t);
  end loop;
end $$;

-- Grant permissions to authenticated users
grant all on public.bk_warehouses to authenticated;
grant all on public.bk_product_stock to authenticated;
grant all on public.bk_stock_movements to authenticated;
grant all on public.bk_batches to authenticated;
grant all on public.bk_serial_numbers to authenticated;
grant all on public.bk_transfer_orders to authenticated;
grant all on public.bk_transfer_items to authenticated;
grant all on public.bk_reorder_alerts to authenticated;
grant all on public.bk_inventory_counts to authenticated;
grant all on public.bk_inventory_count_items to authenticated;
grant all on public.bk_demand_forecasts to authenticated;

comment on table public.bk_warehouses is 'Multi-location warehouse management';
comment on table public.bk_product_stock is 'Product stock levels per warehouse';
comment on table public.bk_stock_movements is 'Complete audit trail of all stock movements';
comment on table public.bk_batches is 'Batch/lot tracking for expiry and recall management';
comment on table public.bk_serial_numbers is 'Individual serial number tracking';
comment on table public.bk_transfer_orders is 'Inter-warehouse transfer orders';
comment on table public.bk_reorder_alerts is 'AI-powered reorder alerts and purchase requisitions';
comment on table public.bk_inventory_counts is 'Scheduled stocktakes and physical counts';
comment on table public.bk_demand_forecasts is 'AI demand forecasting data';
