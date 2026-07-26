--
-- PostgreSQL database dump
--

\restrict A4lb1dLLKRey6DXNc5F4UDgO8nqwGJxlNkAJTgKa2aosoy8BUROmdlTHXbNdH6M

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-26 17:35:21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 236 (class 1259 OID 16716)
-- Name: approval_rule_approvers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.approval_rule_approvers (
    rule_approver_id integer NOT NULL,
    rule_id integer NOT NULL,
    sequence_no integer NOT NULL,
    role_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.approval_rule_approvers OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16715)
-- Name: approval_rule_approvers_rule_approver_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.approval_rule_approvers_rule_approver_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.approval_rule_approvers_rule_approver_id_seq OWNER TO postgres;

--
-- TOC entry 5195 (class 0 OID 0)
-- Dependencies: 235
-- Name: approval_rule_approvers_rule_approver_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.approval_rule_approvers_rule_approver_id_seq OWNED BY public.approval_rule_approvers.rule_approver_id;


--
-- TOC entry 234 (class 1259 OID 16692)
-- Name: approval_rules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.approval_rules (
    rule_id integer NOT NULL,
    department_id integer NOT NULL,
    category_id integer NOT NULL,
    min_amount numeric(12,2) NOT NULL,
    max_amount numeric(12,2) NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.approval_rules OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16691)
-- Name: approval_rules_rule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.approval_rules_rule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.approval_rules_rule_id_seq OWNER TO postgres;

--
-- TOC entry 5196 (class 0 OID 0)
-- Dependencies: 233
-- Name: approval_rules_rule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.approval_rules_rule_id_seq OWNED BY public.approval_rules.rule_id;


--
-- TOC entry 250 (class 1259 OID 16881)
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_logs (
    audit_id integer NOT NULL,
    user_id integer,
    module character varying(100),
    action character varying(100),
    entity_name character varying(100),
    entity_id integer,
    remarks text,
    action_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.audit_logs OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 16880)
-- Name: audit_logs_audit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.audit_logs_audit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.audit_logs_audit_id_seq OWNER TO postgres;

--
-- TOC entry 5197 (class 0 OID 0)
-- Dependencies: 249
-- Name: audit_logs_audit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.audit_logs_audit_id_seq OWNED BY public.audit_logs.audit_id;


--
-- TOC entry 230 (class 1259 OID 16660)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category_code character varying(20) NOT NULL,
    category_name character varying(100) NOT NULL,
    description text,
    status character varying(20) DEFAULT 'ACTIVE'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16659)
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_category_id_seq OWNER TO postgres;

--
-- TOC entry 5198 (class 0 OID 0)
-- Dependencies: 229
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;


--
-- TOC entry 222 (class 1259 OID 16570)
-- Name: cost_centers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cost_centers (
    cost_center_id integer NOT NULL,
    cost_center_code character varying(20) NOT NULL,
    cost_center_name character varying(100) NOT NULL,
    description text,
    status character varying(20) DEFAULT 'ACTIVE'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cost_centers OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16569)
-- Name: cost_centers_cost_center_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cost_centers_cost_center_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cost_centers_cost_center_id_seq OWNER TO postgres;

--
-- TOC entry 5199 (class 0 OID 0)
-- Dependencies: 221
-- Name: cost_centers_cost_center_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cost_centers_cost_center_id_seq OWNED BY public.cost_centers.cost_center_id;


--
-- TOC entry 224 (class 1259 OID 16586)
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    department_id integer NOT NULL,
    cost_center_id integer NOT NULL,
    department_code character varying(20) NOT NULL,
    department_name character varying(100) NOT NULL,
    description text,
    status character varying(20) DEFAULT 'ACTIVE'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16585)
-- Name: departments_department_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departments_department_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departments_department_id_seq OWNER TO postgres;

--
-- TOC entry 5200 (class 0 OID 0)
-- Dependencies: 223
-- Name: departments_department_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departments_department_id_seq OWNED BY public.departments.department_id;


--
-- TOC entry 246 (class 1259 OID 16843)
-- Name: po_line_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.po_line_items (
    po_line_item_id integer NOT NULL,
    po_id integer NOT NULL,
    description text,
    ordered_qty integer,
    received_qty integer DEFAULT 0,
    unit_price numeric(12,2)
);


ALTER TABLE public.po_line_items OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 16842)
-- Name: po_line_items_po_line_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.po_line_items_po_line_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.po_line_items_po_line_item_id_seq OWNER TO postgres;

--
-- TOC entry 5201 (class 0 OID 0)
-- Dependencies: 245
-- Name: po_line_items_po_line_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.po_line_items_po_line_item_id_seq OWNED BY public.po_line_items.po_line_item_id;


--
-- TOC entry 248 (class 1259 OID 16860)
-- Name: po_receipts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.po_receipts (
    receipt_id integer NOT NULL,
    po_id integer NOT NULL,
    description text,
    qty_received integer,
    received_date date,
    received_by integer
);


ALTER TABLE public.po_receipts OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 16859)
-- Name: po_receipts_receipt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.po_receipts_receipt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.po_receipts_receipt_id_seq OWNER TO postgres;

--
-- TOC entry 5202 (class 0 OID 0)
-- Dependencies: 247
-- Name: po_receipts_receipt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.po_receipts_receipt_id_seq OWNED BY public.po_receipts.receipt_id;


--
-- TOC entry 244 (class 1259 OID 16819)
-- Name: purchase_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchase_orders (
    po_id integer NOT NULL,
    po_number character varying(30) NOT NULL,
    requisition_id integer NOT NULL,
    supplier_id integer NOT NULL,
    created_date date,
    stage character varying(50),
    status character varying(30),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.purchase_orders OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 16818)
-- Name: purchase_orders_po_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.purchase_orders_po_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.purchase_orders_po_id_seq OWNER TO postgres;

--
-- TOC entry 5203 (class 0 OID 0)
-- Dependencies: 243
-- Name: purchase_orders_po_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.purchase_orders_po_id_seq OWNED BY public.purchase_orders.po_id;


--
-- TOC entry 242 (class 1259 OID 16796)
-- Name: requisition_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requisition_history (
    history_id integer NOT NULL,
    requisition_id integer NOT NULL,
    action_by integer NOT NULL,
    step character varying(100),
    remarks text,
    action_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.requisition_history OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 16795)
-- Name: requisition_history_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.requisition_history_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.requisition_history_history_id_seq OWNER TO postgres;

--
-- TOC entry 5204 (class 0 OID 0)
-- Dependencies: 241
-- Name: requisition_history_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.requisition_history_history_id_seq OWNED BY public.requisition_history.history_id;


--
-- TOC entry 240 (class 1259 OID 16777)
-- Name: requisition_line_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requisition_line_items (
    line_item_id integer NOT NULL,
    requisition_id integer NOT NULL,
    description text NOT NULL,
    quantity integer NOT NULL,
    unit_price numeric(12,2) NOT NULL
);


ALTER TABLE public.requisition_line_items OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16776)
-- Name: requisition_line_items_line_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.requisition_line_items_line_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.requisition_line_items_line_item_id_seq OWNER TO postgres;

--
-- TOC entry 5205 (class 0 OID 0)
-- Dependencies: 239
-- Name: requisition_line_items_line_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.requisition_line_items_line_item_id_seq OWNED BY public.requisition_line_items.line_item_id;


--
-- TOC entry 238 (class 1259 OID 16738)
-- Name: requisitions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requisitions (
    requisition_id integer NOT NULL,
    requisition_number character varying(30) NOT NULL,
    created_by integer NOT NULL,
    department_id integer NOT NULL,
    supplier_id integer,
    category_id integer NOT NULL,
    title character varying(150) NOT NULL,
    justification text,
    needed_by date,
    total_amount numeric(12,2),
    status character varying(30) DEFAULT 'PENDING'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.requisitions OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16737)
-- Name: requisitions_requisition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.requisitions_requisition_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.requisitions_requisition_id_seq OWNER TO postgres;

--
-- TOC entry 5206 (class 0 OID 0)
-- Dependencies: 237
-- Name: requisitions_requisition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.requisitions_requisition_id_seq OWNED BY public.requisitions.requisition_id;


--
-- TOC entry 220 (class 1259 OID 16556)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name character varying(50) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16555)
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_role_id_seq OWNER TO postgres;

--
-- TOC entry 5207 (class 0 OID 0)
-- Dependencies: 219
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- TOC entry 232 (class 1259 OID 16676)
-- Name: suppliers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suppliers (
    supplier_id integer NOT NULL,
    supplier_code character varying(20) NOT NULL,
    supplier_name character varying(150) NOT NULL,
    contact_name character varying(100),
    email character varying(100),
    phone character varying(20),
    address text,
    gst_number character varying(30),
    status character varying(20) DEFAULT 'ACTIVE'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.suppliers OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16675)
-- Name: suppliers_supplier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suppliers_supplier_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suppliers_supplier_id_seq OWNER TO postgres;

--
-- TOC entry 5208 (class 0 OID 0)
-- Dependencies: 231
-- Name: suppliers_supplier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suppliers_supplier_id_seq OWNED BY public.suppliers.supplier_id;


--
-- TOC entry 228 (class 1259 OID 16637)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_role_id integer NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16636)
-- Name: user_roles_user_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_roles_user_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_roles_user_role_id_seq OWNER TO postgres;

--
-- TOC entry 5209 (class 0 OID 0)
-- Dependencies: 227
-- Name: user_roles_user_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_roles_user_role_id_seq OWNED BY public.user_roles.user_role_id;


--
-- TOC entry 226 (class 1259 OID 16608)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    department_id integer NOT NULL,
    employee_id character varying(20) NOT NULL,
    username character varying(50) NOT NULL,
    password_hash character varying(255) NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(20),
    designation character varying(100),
    status character varying(20) DEFAULT 'ACTIVE'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16607)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 5210 (class 0 OID 0)
-- Dependencies: 225
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4953 (class 2604 OID 16719)
-- Name: approval_rule_approvers rule_approver_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rule_approvers ALTER COLUMN rule_approver_id SET DEFAULT nextval('public.approval_rule_approvers_rule_approver_id_seq'::regclass);


--
-- TOC entry 4950 (class 2604 OID 16695)
-- Name: approval_rules rule_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rules ALTER COLUMN rule_id SET DEFAULT nextval('public.approval_rules_rule_id_seq'::regclass);


--
-- TOC entry 4966 (class 2604 OID 16884)
-- Name: audit_logs audit_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs ALTER COLUMN audit_id SET DEFAULT nextval('public.audit_logs_audit_id_seq'::regclass);


--
-- TOC entry 4944 (class 2604 OID 16663)
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- TOC entry 4933 (class 2604 OID 16573)
-- Name: cost_centers cost_center_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cost_centers ALTER COLUMN cost_center_id SET DEFAULT nextval('public.cost_centers_cost_center_id_seq'::regclass);


--
-- TOC entry 4936 (class 2604 OID 16589)
-- Name: departments department_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN department_id SET DEFAULT nextval('public.departments_department_id_seq'::regclass);


--
-- TOC entry 4963 (class 2604 OID 16846)
-- Name: po_line_items po_line_item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.po_line_items ALTER COLUMN po_line_item_id SET DEFAULT nextval('public.po_line_items_po_line_item_id_seq'::regclass);


--
-- TOC entry 4965 (class 2604 OID 16863)
-- Name: po_receipts receipt_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.po_receipts ALTER COLUMN receipt_id SET DEFAULT nextval('public.po_receipts_receipt_id_seq'::regclass);


--
-- TOC entry 4961 (class 2604 OID 16822)
-- Name: purchase_orders po_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_orders ALTER COLUMN po_id SET DEFAULT nextval('public.purchase_orders_po_id_seq'::regclass);


--
-- TOC entry 4959 (class 2604 OID 16799)
-- Name: requisition_history history_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisition_history ALTER COLUMN history_id SET DEFAULT nextval('public.requisition_history_history_id_seq'::regclass);


--
-- TOC entry 4958 (class 2604 OID 16780)
-- Name: requisition_line_items line_item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisition_line_items ALTER COLUMN line_item_id SET DEFAULT nextval('public.requisition_line_items_line_item_id_seq'::regclass);


--
-- TOC entry 4955 (class 2604 OID 16741)
-- Name: requisitions requisition_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitions ALTER COLUMN requisition_id SET DEFAULT nextval('public.requisitions_requisition_id_seq'::regclass);


--
-- TOC entry 4931 (class 2604 OID 16559)
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- TOC entry 4947 (class 2604 OID 16679)
-- Name: suppliers supplier_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN supplier_id SET DEFAULT nextval('public.suppliers_supplier_id_seq'::regclass);


--
-- TOC entry 4942 (class 2604 OID 16640)
-- Name: user_roles user_role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles ALTER COLUMN user_role_id SET DEFAULT nextval('public.user_roles_user_role_id_seq'::regclass);


--
-- TOC entry 4939 (class 2604 OID 16611)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 5003 (class 2606 OID 16726)
-- Name: approval_rule_approvers approval_rule_approvers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rule_approvers
    ADD CONSTRAINT approval_rule_approvers_pkey PRIMARY KEY (rule_approver_id);


--
-- TOC entry 5001 (class 2606 OID 16704)
-- Name: approval_rules approval_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rules
    ADD CONSTRAINT approval_rules_pkey PRIMARY KEY (rule_id);


--
-- TOC entry 5021 (class 2606 OID 16890)
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (audit_id);


--
-- TOC entry 4993 (class 2606 OID 16674)
-- Name: categories categories_category_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_category_code_key UNIQUE (category_code);


--
-- TOC entry 4995 (class 2606 OID 16672)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- TOC entry 4973 (class 2606 OID 16584)
-- Name: cost_centers cost_centers_cost_center_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cost_centers
    ADD CONSTRAINT cost_centers_cost_center_code_key UNIQUE (cost_center_code);


--
-- TOC entry 4975 (class 2606 OID 16582)
-- Name: cost_centers cost_centers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cost_centers
    ADD CONSTRAINT cost_centers_pkey PRIMARY KEY (cost_center_id);


--
-- TOC entry 4977 (class 2606 OID 16601)
-- Name: departments departments_department_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_department_code_key UNIQUE (department_code);


--
-- TOC entry 4979 (class 2606 OID 16599)
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (department_id);


--
-- TOC entry 5017 (class 2606 OID 16853)
-- Name: po_line_items po_line_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.po_line_items
    ADD CONSTRAINT po_line_items_pkey PRIMARY KEY (po_line_item_id);


--
-- TOC entry 5019 (class 2606 OID 16869)
-- Name: po_receipts po_receipts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.po_receipts
    ADD CONSTRAINT po_receipts_pkey PRIMARY KEY (receipt_id);


--
-- TOC entry 5013 (class 2606 OID 16829)
-- Name: purchase_orders purchase_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_orders
    ADD CONSTRAINT purchase_orders_pkey PRIMARY KEY (po_id);


--
-- TOC entry 5015 (class 2606 OID 16831)
-- Name: purchase_orders purchase_orders_po_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_orders
    ADD CONSTRAINT purchase_orders_po_number_key UNIQUE (po_number);


--
-- TOC entry 5011 (class 2606 OID 16807)
-- Name: requisition_history requisition_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisition_history
    ADD CONSTRAINT requisition_history_pkey PRIMARY KEY (history_id);


--
-- TOC entry 5009 (class 2606 OID 16789)
-- Name: requisition_line_items requisition_line_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisition_line_items
    ADD CONSTRAINT requisition_line_items_pkey PRIMARY KEY (line_item_id);


--
-- TOC entry 5005 (class 2606 OID 16753)
-- Name: requisitions requisitions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitions
    ADD CONSTRAINT requisitions_pkey PRIMARY KEY (requisition_id);


--
-- TOC entry 5007 (class 2606 OID 16755)
-- Name: requisitions requisitions_requisition_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitions
    ADD CONSTRAINT requisitions_requisition_number_key UNIQUE (requisition_number);


--
-- TOC entry 4969 (class 2606 OID 16566)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- TOC entry 4971 (class 2606 OID 16568)
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- TOC entry 4997 (class 2606 OID 16688)
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (supplier_id);


--
-- TOC entry 4999 (class 2606 OID 16690)
-- Name: suppliers suppliers_supplier_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_supplier_code_key UNIQUE (supplier_code);


--
-- TOC entry 4989 (class 2606 OID 16648)
-- Name: user_roles uq_user_role; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT uq_user_role UNIQUE (user_id, role_id);


--
-- TOC entry 4991 (class 2606 OID 16646)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_role_id);


--
-- TOC entry 4981 (class 2606 OID 16630)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4983 (class 2606 OID 16626)
-- Name: users users_employee_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_employee_id_key UNIQUE (employee_id);


--
-- TOC entry 4985 (class 2606 OID 16624)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4987 (class 2606 OID 16628)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 5042 (class 2606 OID 16891)
-- Name: audit_logs fk_audit_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 5022 (class 2606 OID 16602)
-- Name: departments fk_department_costcenter; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT fk_department_costcenter FOREIGN KEY (cost_center_id) REFERENCES public.cost_centers(cost_center_id);


--
-- TOC entry 5035 (class 2606 OID 16808)
-- Name: requisition_history fk_history_req; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisition_history
    ADD CONSTRAINT fk_history_req FOREIGN KEY (requisition_id) REFERENCES public.requisitions(requisition_id);


--
-- TOC entry 5036 (class 2606 OID 16813)
-- Name: requisition_history fk_history_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisition_history
    ADD CONSTRAINT fk_history_user FOREIGN KEY (action_by) REFERENCES public.users(user_id);


--
-- TOC entry 5034 (class 2606 OID 16790)
-- Name: requisition_line_items fk_lineitem_req; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisition_line_items
    ADD CONSTRAINT fk_lineitem_req FOREIGN KEY (requisition_id) REFERENCES public.requisitions(requisition_id);


--
-- TOC entry 5037 (class 2606 OID 16832)
-- Name: purchase_orders fk_po_req; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_orders
    ADD CONSTRAINT fk_po_req FOREIGN KEY (requisition_id) REFERENCES public.requisitions(requisition_id);


--
-- TOC entry 5038 (class 2606 OID 16837)
-- Name: purchase_orders fk_po_supplier; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_orders
    ADD CONSTRAINT fk_po_supplier FOREIGN KEY (supplier_id) REFERENCES public.suppliers(supplier_id);


--
-- TOC entry 5039 (class 2606 OID 16854)
-- Name: po_line_items fk_poline_po; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.po_line_items
    ADD CONSTRAINT fk_poline_po FOREIGN KEY (po_id) REFERENCES public.purchase_orders(po_id);


--
-- TOC entry 5040 (class 2606 OID 16870)
-- Name: po_receipts fk_receipt_po; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.po_receipts
    ADD CONSTRAINT fk_receipt_po FOREIGN KEY (po_id) REFERENCES public.purchase_orders(po_id);


--
-- TOC entry 5041 (class 2606 OID 16875)
-- Name: po_receipts fk_receipt_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.po_receipts
    ADD CONSTRAINT fk_receipt_user FOREIGN KEY (received_by) REFERENCES public.users(user_id);


--
-- TOC entry 5030 (class 2606 OID 16771)
-- Name: requisitions fk_req_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitions
    ADD CONSTRAINT fk_req_category FOREIGN KEY (category_id) REFERENCES public.categories(category_id);


--
-- TOC entry 5031 (class 2606 OID 16761)
-- Name: requisitions fk_req_department; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitions
    ADD CONSTRAINT fk_req_department FOREIGN KEY (department_id) REFERENCES public.departments(department_id);


--
-- TOC entry 5032 (class 2606 OID 16766)
-- Name: requisitions fk_req_supplier; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitions
    ADD CONSTRAINT fk_req_supplier FOREIGN KEY (supplier_id) REFERENCES public.suppliers(supplier_id);


--
-- TOC entry 5033 (class 2606 OID 16756)
-- Name: requisitions fk_req_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitions
    ADD CONSTRAINT fk_req_user FOREIGN KEY (created_by) REFERENCES public.users(user_id);


--
-- TOC entry 5026 (class 2606 OID 16710)
-- Name: approval_rules fk_rule_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rules
    ADD CONSTRAINT fk_rule_category FOREIGN KEY (category_id) REFERENCES public.categories(category_id);


--
-- TOC entry 5027 (class 2606 OID 16705)
-- Name: approval_rules fk_rule_department; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rules
    ADD CONSTRAINT fk_rule_department FOREIGN KEY (department_id) REFERENCES public.departments(department_id);


--
-- TOC entry 5028 (class 2606 OID 16732)
-- Name: approval_rule_approvers fk_ruleapprover_role; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rule_approvers
    ADD CONSTRAINT fk_ruleapprover_role FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


--
-- TOC entry 5029 (class 2606 OID 16727)
-- Name: approval_rule_approvers fk_ruleapprover_rule; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rule_approvers
    ADD CONSTRAINT fk_ruleapprover_rule FOREIGN KEY (rule_id) REFERENCES public.approval_rules(rule_id);


--
-- TOC entry 5023 (class 2606 OID 16631)
-- Name: users fk_user_department; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_user_department FOREIGN KEY (department_id) REFERENCES public.departments(department_id);


--
-- TOC entry 5024 (class 2606 OID 16654)
-- Name: user_roles fk_userroles_role; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fk_userroles_role FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


--
-- TOC entry 5025 (class 2606 OID 16649)
-- Name: user_roles fk_userroles_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fk_userroles_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);


-- Completed on 2026-07-26 17:35:21

--
-- PostgreSQL database dump complete
--

\unrestrict A4lb1dLLKRey6DXNc5F4UDgO8nqwGJxlNkAJTgKa2aosoy8BUROmdlTHXbNdH6M

