--
-- PostgreSQL database dump
--

\restrict sE4TpgAGWznlTedRhbtnb9RsLn7kiJwoaC17P9D6kDdf2wwjdwpCwkfBg9PLYPr

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-08-01 16:30:52

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
-- TOC entry 219 (class 1259 OID 18125)
-- Name: approval_rule_approvers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.approval_rule_approvers (
    rule_approver_id bigint NOT NULL,
    rule_id bigint NOT NULL,
    sequence_no integer NOT NULL,
    role_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.approval_rule_approvers OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 18133)
-- Name: approval_rule_approvers_rule_approver_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.approval_rule_approvers_rule_approver_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.approval_rule_approvers_rule_approver_id_seq OWNER TO postgres;

--
-- TOC entry 5195 (class 0 OID 0)
-- Dependencies: 220
-- Name: approval_rule_approvers_rule_approver_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.approval_rule_approvers_rule_approver_id_seq OWNED BY public.approval_rule_approvers.rule_approver_id;


--
-- TOC entry 221 (class 1259 OID 18134)
-- Name: approval_rules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.approval_rules (
    rule_id bigint NOT NULL,
    department_id bigint NOT NULL,
    category_id bigint NOT NULL,
    min_amount numeric(12,2) NOT NULL,
    max_amount numeric(12,2) NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.approval_rules OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 18144)
-- Name: approval_rules_rule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.approval_rules_rule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.approval_rules_rule_id_seq OWNER TO postgres;

--
-- TOC entry 5196 (class 0 OID 0)
-- Dependencies: 222
-- Name: approval_rules_rule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.approval_rules_rule_id_seq OWNED BY public.approval_rules.rule_id;


--
-- TOC entry 223 (class 1259 OID 18145)
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_logs (
    audit_id bigint NOT NULL,
    user_id bigint,
    module character varying(100),
    action character varying(100),
    entity_name character varying(100),
    entity_id bigint,
    remarks text,
    action_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.audit_logs OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 18152)
-- Name: audit_logs_audit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.audit_logs_audit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.audit_logs_audit_id_seq OWNER TO postgres;

--
-- TOC entry 5197 (class 0 OID 0)
-- Dependencies: 224
-- Name: audit_logs_audit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.audit_logs_audit_id_seq OWNED BY public.audit_logs.audit_id;


--
-- TOC entry 225 (class 1259 OID 18153)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    category_id bigint NOT NULL,
    category_code character varying(20) NOT NULL,
    category_name character varying(100) NOT NULL,
    description text,
    status character varying(20) DEFAULT 'ACTIVE'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 18163)
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_category_id_seq OWNER TO postgres;

--
-- TOC entry 5198 (class 0 OID 0)
-- Dependencies: 226
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;


--
-- TOC entry 227 (class 1259 OID 18164)
-- Name: cost_centers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cost_centers (
    cost_center_id bigint NOT NULL,
    cost_center_code character varying(20) NOT NULL,
    cost_center_name character varying(100) NOT NULL,
    description text,
    status character varying(20) DEFAULT 'ACTIVE'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cost_centers OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 18174)
-- Name: cost_centers_cost_center_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cost_centers_cost_center_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cost_centers_cost_center_id_seq OWNER TO postgres;

--
-- TOC entry 5199 (class 0 OID 0)
-- Dependencies: 228
-- Name: cost_centers_cost_center_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cost_centers_cost_center_id_seq OWNED BY public.cost_centers.cost_center_id;


--
-- TOC entry 229 (class 1259 OID 18175)
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    department_id bigint NOT NULL,
    cost_center_id bigint NOT NULL,
    department_code character varying(20) NOT NULL,
    department_name character varying(100) NOT NULL,
    description text,
    status character varying(20) DEFAULT 'ACTIVE'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 18186)
-- Name: departments_department_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departments_department_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departments_department_id_seq OWNER TO postgres;

--
-- TOC entry 5200 (class 0 OID 0)
-- Dependencies: 230
-- Name: departments_department_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departments_department_id_seq OWNED BY public.departments.department_id;


--
-- TOC entry 231 (class 1259 OID 18187)
-- Name: po_line_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.po_line_items (
    po_line_item_id bigint NOT NULL,
    po_id bigint NOT NULL,
    description text,
    ordered_qty integer,
    received_qty integer DEFAULT 0,
    unit_price numeric(12,2)
);


ALTER TABLE public.po_line_items OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 18195)
-- Name: po_line_items_po_line_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.po_line_items_po_line_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.po_line_items_po_line_item_id_seq OWNER TO postgres;

--
-- TOC entry 5201 (class 0 OID 0)
-- Dependencies: 232
-- Name: po_line_items_po_line_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.po_line_items_po_line_item_id_seq OWNED BY public.po_line_items.po_line_item_id;


--
-- TOC entry 233 (class 1259 OID 18196)
-- Name: po_receipts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.po_receipts (
    receipt_id bigint NOT NULL,
    po_id bigint NOT NULL,
    description text,
    qty_received integer,
    received_date date,
    received_by bigint
);


ALTER TABLE public.po_receipts OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 18203)
-- Name: po_receipts_receipt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.po_receipts_receipt_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.po_receipts_receipt_id_seq OWNER TO postgres;

--
-- TOC entry 5202 (class 0 OID 0)
-- Dependencies: 234
-- Name: po_receipts_receipt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.po_receipts_receipt_id_seq OWNED BY public.po_receipts.receipt_id;


--
-- TOC entry 235 (class 1259 OID 18204)
-- Name: purchase_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchase_orders (
    po_id bigint NOT NULL,
    po_number character varying(30) NOT NULL,
    requisition_id bigint NOT NULL,
    supplier_id bigint NOT NULL,
    created_date date,
    stage character varying(50),
    status character varying(30),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.purchase_orders OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 18212)
-- Name: purchase_orders_po_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.purchase_orders_po_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.purchase_orders_po_id_seq OWNER TO postgres;

--
-- TOC entry 5203 (class 0 OID 0)
-- Dependencies: 236
-- Name: purchase_orders_po_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.purchase_orders_po_id_seq OWNED BY public.purchase_orders.po_id;


--
-- TOC entry 237 (class 1259 OID 18213)
-- Name: requisition_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requisition_history (
    history_id bigint NOT NULL,
    requisition_id bigint NOT NULL,
    action_by bigint NOT NULL,
    step character varying(100),
    remarks text,
    action_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.requisition_history OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 18222)
-- Name: requisition_history_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.requisition_history_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.requisition_history_history_id_seq OWNER TO postgres;

--
-- TOC entry 5204 (class 0 OID 0)
-- Dependencies: 238
-- Name: requisition_history_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.requisition_history_history_id_seq OWNED BY public.requisition_history.history_id;


--
-- TOC entry 239 (class 1259 OID 18223)
-- Name: requisition_line_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requisition_line_items (
    line_item_id bigint NOT NULL,
    requisition_id bigint NOT NULL,
    description text NOT NULL,
    quantity integer NOT NULL,
    unit_price numeric(12,2) NOT NULL
);


ALTER TABLE public.requisition_line_items OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 18233)
-- Name: requisition_line_items_line_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.requisition_line_items_line_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.requisition_line_items_line_item_id_seq OWNER TO postgres;

--
-- TOC entry 5205 (class 0 OID 0)
-- Dependencies: 240
-- Name: requisition_line_items_line_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.requisition_line_items_line_item_id_seq OWNED BY public.requisition_line_items.line_item_id;


--
-- TOC entry 241 (class 1259 OID 18234)
-- Name: requisitions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requisitions (
    requisition_id bigint NOT NULL,
    requisition_number character varying(30) NOT NULL,
    created_by bigint NOT NULL,
    department_id bigint NOT NULL,
    supplier_id bigint,
    category_id bigint NOT NULL,
    title character varying(150) NOT NULL,
    justification text,
    needed_by date,
    total_amount numeric(12,2),
    status character varying(30) DEFAULT 'PENDING'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.requisitions OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 18247)
-- Name: requisitions_requisition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.requisitions_requisition_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.requisitions_requisition_id_seq OWNER TO postgres;

--
-- TOC entry 5206 (class 0 OID 0)
-- Dependencies: 242
-- Name: requisitions_requisition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.requisitions_requisition_id_seq OWNED BY public.requisitions.requisition_id;


--
-- TOC entry 243 (class 1259 OID 18248)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    role_id bigint NOT NULL,
    role_name character varying(50) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 18256)
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_role_id_seq OWNER TO postgres;

--
-- TOC entry 5207 (class 0 OID 0)
-- Dependencies: 244
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- TOC entry 245 (class 1259 OID 18257)
-- Name: suppliers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suppliers (
    supplier_id bigint NOT NULL,
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
-- TOC entry 246 (class 1259 OID 18267)
-- Name: suppliers_supplier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suppliers_supplier_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suppliers_supplier_id_seq OWNER TO postgres;

--
-- TOC entry 5208 (class 0 OID 0)
-- Dependencies: 246
-- Name: suppliers_supplier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suppliers_supplier_id_seq OWNED BY public.suppliers.supplier_id;


--
-- TOC entry 247 (class 1259 OID 18268)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_role_id bigint NOT NULL,
    user_id bigint NOT NULL,
    role_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 18275)
-- Name: user_roles_user_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_roles_user_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_roles_user_role_id_seq OWNER TO postgres;

--
-- TOC entry 5209 (class 0 OID 0)
-- Dependencies: 248
-- Name: user_roles_user_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_roles_user_role_id_seq OWNED BY public.user_roles.user_role_id;


--
-- TOC entry 249 (class 1259 OID 18276)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    department_id bigint NOT NULL,
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
-- TOC entry 250 (class 1259 OID 18290)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 5210 (class 0 OID 0)
-- Dependencies: 250
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4931 (class 2604 OID 18291)
-- Name: approval_rule_approvers rule_approver_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rule_approvers ALTER COLUMN rule_approver_id SET DEFAULT nextval('public.approval_rule_approvers_rule_approver_id_seq'::regclass);


--
-- TOC entry 4933 (class 2604 OID 18292)
-- Name: approval_rules rule_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rules ALTER COLUMN rule_id SET DEFAULT nextval('public.approval_rules_rule_id_seq'::regclass);


--
-- TOC entry 4936 (class 2604 OID 18293)
-- Name: audit_logs audit_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs ALTER COLUMN audit_id SET DEFAULT nextval('public.audit_logs_audit_id_seq'::regclass);


--
-- TOC entry 4938 (class 2604 OID 18294)
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- TOC entry 4941 (class 2604 OID 18295)
-- Name: cost_centers cost_center_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cost_centers ALTER COLUMN cost_center_id SET DEFAULT nextval('public.cost_centers_cost_center_id_seq'::regclass);


--
-- TOC entry 4944 (class 2604 OID 18296)
-- Name: departments department_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN department_id SET DEFAULT nextval('public.departments_department_id_seq'::regclass);


--
-- TOC entry 4947 (class 2604 OID 18297)
-- Name: po_line_items po_line_item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.po_line_items ALTER COLUMN po_line_item_id SET DEFAULT nextval('public.po_line_items_po_line_item_id_seq'::regclass);


--
-- TOC entry 4949 (class 2604 OID 18298)
-- Name: po_receipts receipt_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.po_receipts ALTER COLUMN receipt_id SET DEFAULT nextval('public.po_receipts_receipt_id_seq'::regclass);


--
-- TOC entry 4950 (class 2604 OID 18299)
-- Name: purchase_orders po_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_orders ALTER COLUMN po_id SET DEFAULT nextval('public.purchase_orders_po_id_seq'::regclass);


--
-- TOC entry 4952 (class 2604 OID 18300)
-- Name: requisition_history history_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisition_history ALTER COLUMN history_id SET DEFAULT nextval('public.requisition_history_history_id_seq'::regclass);


--
-- TOC entry 4954 (class 2604 OID 18301)
-- Name: requisition_line_items line_item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisition_line_items ALTER COLUMN line_item_id SET DEFAULT nextval('public.requisition_line_items_line_item_id_seq'::regclass);


--
-- TOC entry 4955 (class 2604 OID 18302)
-- Name: requisitions requisition_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitions ALTER COLUMN requisition_id SET DEFAULT nextval('public.requisitions_requisition_id_seq'::regclass);


--
-- TOC entry 4958 (class 2604 OID 18303)
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- TOC entry 4960 (class 2604 OID 18304)
-- Name: suppliers supplier_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN supplier_id SET DEFAULT nextval('public.suppliers_supplier_id_seq'::regclass);


--
-- TOC entry 4963 (class 2604 OID 18305)
-- Name: user_roles user_role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles ALTER COLUMN user_role_id SET DEFAULT nextval('public.user_roles_user_role_id_seq'::regclass);


--
-- TOC entry 4965 (class 2604 OID 18306)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4969 (class 2606 OID 18308)
-- Name: approval_rule_approvers approval_rule_approvers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rule_approvers
    ADD CONSTRAINT approval_rule_approvers_pkey PRIMARY KEY (rule_approver_id);


--
-- TOC entry 4971 (class 2606 OID 18310)
-- Name: approval_rules approval_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rules
    ADD CONSTRAINT approval_rules_pkey PRIMARY KEY (rule_id);


--
-- TOC entry 4973 (class 2606 OID 18312)
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (audit_id);


--
-- TOC entry 4975 (class 2606 OID 18314)
-- Name: categories categories_category_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_category_code_key UNIQUE (category_code);


--
-- TOC entry 4977 (class 2606 OID 18316)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- TOC entry 4979 (class 2606 OID 18318)
-- Name: cost_centers cost_centers_cost_center_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cost_centers
    ADD CONSTRAINT cost_centers_cost_center_code_key UNIQUE (cost_center_code);


--
-- TOC entry 4981 (class 2606 OID 18320)
-- Name: cost_centers cost_centers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cost_centers
    ADD CONSTRAINT cost_centers_pkey PRIMARY KEY (cost_center_id);


--
-- TOC entry 4983 (class 2606 OID 18322)
-- Name: departments departments_department_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_department_code_key UNIQUE (department_code);


--
-- TOC entry 4985 (class 2606 OID 18324)
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (department_id);


--
-- TOC entry 4987 (class 2606 OID 18326)
-- Name: po_line_items po_line_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.po_line_items
    ADD CONSTRAINT po_line_items_pkey PRIMARY KEY (po_line_item_id);


--
-- TOC entry 4989 (class 2606 OID 18328)
-- Name: po_receipts po_receipts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.po_receipts
    ADD CONSTRAINT po_receipts_pkey PRIMARY KEY (receipt_id);


--
-- TOC entry 4991 (class 2606 OID 18330)
-- Name: purchase_orders purchase_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_orders
    ADD CONSTRAINT purchase_orders_pkey PRIMARY KEY (po_id);


--
-- TOC entry 4993 (class 2606 OID 18332)
-- Name: purchase_orders purchase_orders_po_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_orders
    ADD CONSTRAINT purchase_orders_po_number_key UNIQUE (po_number);


--
-- TOC entry 4995 (class 2606 OID 18334)
-- Name: requisition_history requisition_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisition_history
    ADD CONSTRAINT requisition_history_pkey PRIMARY KEY (history_id);


--
-- TOC entry 4997 (class 2606 OID 18336)
-- Name: requisition_line_items requisition_line_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisition_line_items
    ADD CONSTRAINT requisition_line_items_pkey PRIMARY KEY (line_item_id);


--
-- TOC entry 4999 (class 2606 OID 18338)
-- Name: requisitions requisitions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitions
    ADD CONSTRAINT requisitions_pkey PRIMARY KEY (requisition_id);


--
-- TOC entry 5001 (class 2606 OID 18340)
-- Name: requisitions requisitions_requisition_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitions
    ADD CONSTRAINT requisitions_requisition_number_key UNIQUE (requisition_number);


--
-- TOC entry 5003 (class 2606 OID 18342)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- TOC entry 5005 (class 2606 OID 18344)
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- TOC entry 5007 (class 2606 OID 18346)
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (supplier_id);


--
-- TOC entry 5009 (class 2606 OID 18348)
-- Name: suppliers suppliers_supplier_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_supplier_code_key UNIQUE (supplier_code);


--
-- TOC entry 5011 (class 2606 OID 18350)
-- Name: user_roles uq_user_role; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT uq_user_role UNIQUE (user_id, role_id);


--
-- TOC entry 5013 (class 2606 OID 18352)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_role_id);


--
-- TOC entry 5015 (class 2606 OID 18354)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 5017 (class 2606 OID 18356)
-- Name: users users_employee_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_employee_id_key UNIQUE (employee_id);


--
-- TOC entry 5019 (class 2606 OID 18358)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 5021 (class 2606 OID 18360)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 5026 (class 2606 OID 18361)
-- Name: audit_logs fk_audit_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 5027 (class 2606 OID 18366)
-- Name: departments fk_department_costcenter; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT fk_department_costcenter FOREIGN KEY (cost_center_id) REFERENCES public.cost_centers(cost_center_id);


--
-- TOC entry 5033 (class 2606 OID 18371)
-- Name: requisition_history fk_history_req; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisition_history
    ADD CONSTRAINT fk_history_req FOREIGN KEY (requisition_id) REFERENCES public.requisitions(requisition_id);


--
-- TOC entry 5034 (class 2606 OID 18376)
-- Name: requisition_history fk_history_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisition_history
    ADD CONSTRAINT fk_history_user FOREIGN KEY (action_by) REFERENCES public.users(user_id);


--
-- TOC entry 5035 (class 2606 OID 18381)
-- Name: requisition_line_items fk_lineitem_req; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisition_line_items
    ADD CONSTRAINT fk_lineitem_req FOREIGN KEY (requisition_id) REFERENCES public.requisitions(requisition_id);


--
-- TOC entry 5031 (class 2606 OID 18386)
-- Name: purchase_orders fk_po_req; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_orders
    ADD CONSTRAINT fk_po_req FOREIGN KEY (requisition_id) REFERENCES public.requisitions(requisition_id);


--
-- TOC entry 5032 (class 2606 OID 18391)
-- Name: purchase_orders fk_po_supplier; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_orders
    ADD CONSTRAINT fk_po_supplier FOREIGN KEY (supplier_id) REFERENCES public.suppliers(supplier_id);


--
-- TOC entry 5028 (class 2606 OID 18396)
-- Name: po_line_items fk_poline_po; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.po_line_items
    ADD CONSTRAINT fk_poline_po FOREIGN KEY (po_id) REFERENCES public.purchase_orders(po_id);


--
-- TOC entry 5029 (class 2606 OID 18401)
-- Name: po_receipts fk_receipt_po; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.po_receipts
    ADD CONSTRAINT fk_receipt_po FOREIGN KEY (po_id) REFERENCES public.purchase_orders(po_id);


--
-- TOC entry 5030 (class 2606 OID 18406)
-- Name: po_receipts fk_receipt_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.po_receipts
    ADD CONSTRAINT fk_receipt_user FOREIGN KEY (received_by) REFERENCES public.users(user_id);


--
-- TOC entry 5036 (class 2606 OID 18411)
-- Name: requisitions fk_req_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitions
    ADD CONSTRAINT fk_req_category FOREIGN KEY (category_id) REFERENCES public.categories(category_id);


--
-- TOC entry 5037 (class 2606 OID 18416)
-- Name: requisitions fk_req_department; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitions
    ADD CONSTRAINT fk_req_department FOREIGN KEY (department_id) REFERENCES public.departments(department_id);


--
-- TOC entry 5038 (class 2606 OID 18421)
-- Name: requisitions fk_req_supplier; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitions
    ADD CONSTRAINT fk_req_supplier FOREIGN KEY (supplier_id) REFERENCES public.suppliers(supplier_id);


--
-- TOC entry 5039 (class 2606 OID 18426)
-- Name: requisitions fk_req_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requisitions
    ADD CONSTRAINT fk_req_user FOREIGN KEY (created_by) REFERENCES public.users(user_id);


--
-- TOC entry 5024 (class 2606 OID 18431)
-- Name: approval_rules fk_rule_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rules
    ADD CONSTRAINT fk_rule_category FOREIGN KEY (category_id) REFERENCES public.categories(category_id);


--
-- TOC entry 5025 (class 2606 OID 18436)
-- Name: approval_rules fk_rule_department; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rules
    ADD CONSTRAINT fk_rule_department FOREIGN KEY (department_id) REFERENCES public.departments(department_id);


--
-- TOC entry 5022 (class 2606 OID 18441)
-- Name: approval_rule_approvers fk_ruleapprover_role; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rule_approvers
    ADD CONSTRAINT fk_ruleapprover_role FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


--
-- TOC entry 5023 (class 2606 OID 18446)
-- Name: approval_rule_approvers fk_ruleapprover_rule; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.approval_rule_approvers
    ADD CONSTRAINT fk_ruleapprover_rule FOREIGN KEY (rule_id) REFERENCES public.approval_rules(rule_id);


--
-- TOC entry 5042 (class 2606 OID 18451)
-- Name: users fk_user_department; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_user_department FOREIGN KEY (department_id) REFERENCES public.departments(department_id);


--
-- TOC entry 5040 (class 2606 OID 18456)
-- Name: user_roles fk_userroles_role; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fk_userroles_role FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


--
-- TOC entry 5041 (class 2606 OID 18461)
-- Name: user_roles fk_userroles_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fk_userroles_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);


-- Completed on 2026-08-01 16:30:52

--
-- PostgreSQL database dump complete
--

\unrestrict sE4TpgAGWznlTedRhbtnb9RsLn7kiJwoaC17P9D6kDdf2wwjdwpCwkfBg9PLYPr

