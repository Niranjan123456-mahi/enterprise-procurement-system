--
-- PostgreSQL database dump
--

\restrict ZBq7cMc7pdrwgaQCBOya2jg1a3F6BZhU3eHE20SbMUfdKhOXFYAdtCUgb3HV8BB

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-08-01 16:30:28

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

--
-- TOC entry 5159 (class 0 OID 18153)
-- Dependencies: 225
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (category_id, category_code, category_name, description, status, created_at) FROM stdin;
1	CAT001	IT Hardware	Computers and Hardware	ACTIVE	2026-07-26 17:25:31.831599
2	CAT002	Office Supplies	Office Materials	ACTIVE	2026-07-26 17:25:31.831599
3	CAT003	Networking	Networking Equipment	ACTIVE	2026-07-26 17:25:31.831599
4	CAT004	Furniture	Office Furniture	ACTIVE	2026-07-26 17:25:31.831599
5	CAT005	Software	Software Licenses	ACTIVE	2026-07-26 17:25:31.831599
\.


--
-- TOC entry 5161 (class 0 OID 18164)
-- Dependencies: 227
-- Data for Name: cost_centers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cost_centers (cost_center_id, cost_center_code, cost_center_name, description, status, created_at) FROM stdin;
1	CC001	Information Technology	IT Cost Center	ACTIVE	2026-07-26 17:24:46.736871
2	CC002	Finance	Finance Cost Center	ACTIVE	2026-07-26 17:24:46.736871
3	CC003	Human Resources	HR Cost Center	ACTIVE	2026-07-26 17:24:46.736871
4	CC004	Operations	Operations Cost Center	ACTIVE	2026-07-26 17:24:46.736871
\.


--
-- TOC entry 5163 (class 0 OID 18175)
-- Dependencies: 229
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (department_id, cost_center_id, department_code, department_name, description, status, created_at) FROM stdin;
1	1	IT	Information Technology	IT Department	ACTIVE	2026-07-26 17:25:22.247404
2	2	FIN	Finance	Finance Department	ACTIVE	2026-07-26 17:25:22.247404
3	3	HR	Human Resources	HR Department	ACTIVE	2026-07-26 17:25:22.247404
4	4	OPS	Operations	Operations Department	ACTIVE	2026-07-26 17:25:22.247404
\.


--
-- TOC entry 5155 (class 0 OID 18134)
-- Dependencies: 221
-- Data for Name: approval_rules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.approval_rules (rule_id, department_id, category_id, min_amount, max_amount, is_active, created_at) FROM stdin;
1	1	1	0.00	50000.00	t	2026-07-26 17:26:44.404231
2	1	1	50001.00	200000.00	t	2026-07-26 17:26:44.404231
3	2	2	0.00	100000.00	t	2026-07-26 17:26:44.404231
\.


--
-- TOC entry 5177 (class 0 OID 18248)
-- Dependencies: 243
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (role_id, role_name, description, created_at) FROM stdin;
1	Admin	System Administrator	2026-07-26 17:24:24.351732
2	Requester	Can create requisitions	2026-07-26 17:24:24.351732
3	Manager	Approves requests	2026-07-26 17:24:24.351732
4	Finance	Finance Approval	2026-07-26 17:24:24.351732
5	Receiver	Receives Purchase Orders	2026-07-26 17:24:24.351732
\.


--
-- TOC entry 5153 (class 0 OID 18125)
-- Dependencies: 219
-- Data for Name: approval_rule_approvers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.approval_rule_approvers (rule_approver_id, rule_id, sequence_no, role_id, created_at) FROM stdin;
1	1	1	3	2026-07-26 17:27:13.89039
2	2	1	3	2026-07-26 17:27:13.89039
3	2	2	4	2026-07-26 17:27:13.89039
4	3	1	4	2026-07-26 17:27:13.89039
\.


--
-- TOC entry 5183 (class 0 OID 18276)
-- Dependencies: 249
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, department_id, employee_id, username, password_hash, full_name, email, phone, designation, status, created_at) FROM stdin;
1	1	EMP001	admin	$2b$10$UUnqpLjVbmiWnLGMKlgvR.vaFlh3G3Kt0suKrxGS7sI66Vf58UJV.	System Admin	admin@company.com	9876500001	Administrator	ACTIVE	2026-07-26 17:26:12.748156
2	1	EMP002	manager1	$2b$10$eCkLbMyGpBTnyL01ZXmRvuj5cCoJcm98kkt5Oe5cwoeqvuPtodpHq	IT Manager	manager@company.com	9876500002	Manager	ACTIVE	2026-07-26 17:26:12.748156
3	2	EMP003	finance1	$2b$10$Iv4LPG/Wc/ahD5GXsOBKku/bgbcDz.l50JYCaqDADclAoDui1F/nm	Finance Officer	finance@company.com	9876500003	Finance	ACTIVE	2026-07-26 17:26:12.748156
4	1	EMP004	requester1	$2b$10$szb4BYNh3R96eJ99AXXur.4u0VOp9ewN3tn.eGjThKJMMpUiI33Jm	John Doe	john@company.com	9876500004	Employee	ACTIVE	2026-07-26 17:26:12.748156
5	4	EMP005	receiver1	$2b$10$Bh0HZxJ4nSfD5qi6FHm6QuTZawuWskjPi/8f.dKMN4R/8XAMb4N22	Warehouse User	receiver@company.com	9876500005	Receiver	ACTIVE	2026-07-26 17:26:12.748156
\.


--
-- TOC entry 5157 (class 0 OID 18145)
-- Dependencies: 223
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audit_logs (audit_id, user_id, module, action, entity_name, entity_id, remarks, action_time) FROM stdin;
1	4	Requisition	CREATE	Requisition	1	Created REQ-2026-001	2026-07-26 17:29:56.651535
2	2	Approval	APPROVE	Requisition	2	Manager Approval	2026-07-26 17:29:56.651535
3	3	Approval	APPROVE	Requisition	2	Finance Approval	2026-07-26 17:29:56.651535
4	5	Receiving	RECEIVE	Purchase Order	2	Received Printer Paper	2026-07-26 17:29:56.651535
\.


--
-- TOC entry 5179 (class 0 OID 18257)
-- Dependencies: 245
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.suppliers (supplier_id, supplier_code, supplier_name, contact_name, email, phone, address, gst_number, status, created_at) FROM stdin;
1	SUP001	Dell India	Rahul Sharma	dell@example.com	9876543210	Bangalore	29ABCDE1234F1Z5	ACTIVE	2026-07-26 17:25:56.598945
2	SUP002	HP India	Amit Kumar	hp@example.com	9876543211	Chennai	29ABCDE1234F1Z6	ACTIVE	2026-07-26 17:25:56.598945
3	SUP003	Lenovo India	Karan Singh	lenovo@example.com	9876543212	Hyderabad	29ABCDE1234F1Z7	ACTIVE	2026-07-26 17:25:56.598945
\.


--
-- TOC entry 5175 (class 0 OID 18234)
-- Dependencies: 241
-- Data for Name: requisitions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.requisitions (requisition_id, requisition_number, created_by, department_id, supplier_id, category_id, title, justification, needed_by, total_amount, status, created_at) FROM stdin;
1	REQ-2026-001	4	1	1	1	Purchase Dell Laptops	Need laptops for new employees	2026-08-10	45000.00	PENDING	2026-07-26 17:27:55.220487
2	REQ-2026-002	4	1	2	1	Purchase HP Desktop	Desktop replacement	2026-08-15	120000.00	APPROVED	2026-07-26 17:27:55.220487
3	REQ-2026-003	3	2	3	2	Office Stationery	Monthly office supplies	2026-08-05	15000.00	APPROVED	2026-07-26 17:27:55.220487
\.


--
-- TOC entry 5169 (class 0 OID 18204)
-- Dependencies: 235
-- Data for Name: purchase_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchase_orders (po_id, po_number, requisition_id, supplier_id, created_date, stage, status, created_at) FROM stdin;
1	PO-2026-001	2	2	2026-07-28	Sent	OPEN	2026-07-26 17:29:07.760916
2	PO-2026-002	3	3	2026-07-28	Partially Delivered	OPEN	2026-07-26 17:29:07.760916
\.


--
-- TOC entry 5165 (class 0 OID 18187)
-- Dependencies: 231
-- Data for Name: po_line_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.po_line_items (po_line_item_id, po_id, description, ordered_qty, received_qty, unit_price) FROM stdin;
1	1	HP EliteDesk Desktop	2	0	60000.00
2	2	Printer Paper Bundle	30	20	500.00
3	2	Pens	100	100	15.00
\.


--
-- TOC entry 5167 (class 0 OID 18196)
-- Dependencies: 233
-- Data for Name: po_receipts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.po_receipts (receipt_id, po_id, description, qty_received, received_date, received_by) FROM stdin;
1	2	Printer Paper Bundle	20	2026-07-29	5
2	2	Pens	100	2026-07-29	5
\.


--
-- TOC entry 5171 (class 0 OID 18213)
-- Dependencies: 237
-- Data for Name: requisition_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.requisition_history (history_id, requisition_id, action_by, step, remarks, action_date) FROM stdin;
1	1	4	Created	Requisition Submitted	2026-07-26 17:28:44.322121
2	2	4	Created	Submitted	2026-07-26 17:28:44.322121
3	2	2	Manager Approved	Approved by IT Manager	2026-07-26 17:28:44.322121
4	2	3	Finance Approved	Budget Approved	2026-07-26 17:28:44.322121
5	3	3	Created	Submitted	2026-07-26 17:28:44.322121
6	3	3	Finance Approved	Approved	2026-07-26 17:28:44.322121
\.


--
-- TOC entry 5173 (class 0 OID 18223)
-- Dependencies: 239
-- Data for Name: requisition_line_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.requisition_line_items (line_item_id, requisition_id, description, quantity, unit_price) FROM stdin;
1	1	Dell Latitude Laptop	1	45000.00
2	2	HP EliteDesk Desktop	2	60000.00
3	3	Printer Paper Bundle	30	500.00
4	3	Pens	100	15.00
\.


--
-- TOC entry 5181 (class 0 OID 18268)
-- Dependencies: 247
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (user_role_id, user_id, role_id, created_at) FROM stdin;
1	1	1	2026-07-26 17:26:28.291107
2	2	3	2026-07-26 17:26:28.291107
3	3	4	2026-07-26 17:26:28.291107
4	4	2	2026-07-26 17:26:28.291107
5	5	5	2026-07-26 17:26:28.291107
\.


--
-- TOC entry 5190 (class 0 OID 0)
-- Dependencies: 220
-- Name: approval_rule_approvers_rule_approver_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.approval_rule_approvers_rule_approver_id_seq', 4, true);


--
-- TOC entry 5191 (class 0 OID 0)
-- Dependencies: 222
-- Name: approval_rules_rule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.approval_rules_rule_id_seq', 3, true);


--
-- TOC entry 5192 (class 0 OID 0)
-- Dependencies: 224
-- Name: audit_logs_audit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.audit_logs_audit_id_seq', 4, true);


--
-- TOC entry 5193 (class 0 OID 0)
-- Dependencies: 226
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 5, true);


--
-- TOC entry 5194 (class 0 OID 0)
-- Dependencies: 228
-- Name: cost_centers_cost_center_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cost_centers_cost_center_id_seq', 4, true);


--
-- TOC entry 5195 (class 0 OID 0)
-- Dependencies: 230
-- Name: departments_department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_department_id_seq', 4, true);


--
-- TOC entry 5196 (class 0 OID 0)
-- Dependencies: 232
-- Name: po_line_items_po_line_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.po_line_items_po_line_item_id_seq', 3, true);


--
-- TOC entry 5197 (class 0 OID 0)
-- Dependencies: 234
-- Name: po_receipts_receipt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.po_receipts_receipt_id_seq', 2, true);


--
-- TOC entry 5198 (class 0 OID 0)
-- Dependencies: 236
-- Name: purchase_orders_po_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.purchase_orders_po_id_seq', 2, true);


--
-- TOC entry 5199 (class 0 OID 0)
-- Dependencies: 238
-- Name: requisition_history_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.requisition_history_history_id_seq', 6, true);


--
-- TOC entry 5200 (class 0 OID 0)
-- Dependencies: 240
-- Name: requisition_line_items_line_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.requisition_line_items_line_item_id_seq', 4, true);


--
-- TOC entry 5201 (class 0 OID 0)
-- Dependencies: 242
-- Name: requisitions_requisition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.requisitions_requisition_id_seq', 3, true);


--
-- TOC entry 5202 (class 0 OID 0)
-- Dependencies: 244
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 5, true);


--
-- TOC entry 5203 (class 0 OID 0)
-- Dependencies: 246
-- Name: suppliers_supplier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.suppliers_supplier_id_seq', 3, true);


--
-- TOC entry 5204 (class 0 OID 0)
-- Dependencies: 248
-- Name: user_roles_user_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_roles_user_role_id_seq', 5, true);


--
-- TOC entry 5205 (class 0 OID 0)
-- Dependencies: 250
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 5, true);


-- Completed on 2026-08-01 16:30:28

--
-- PostgreSQL database dump complete
--

\unrestrict ZBq7cMc7pdrwgaQCBOya2jg1a3F6BZhU3eHE20SbMUfdKhOXFYAdtCUgb3HV8BB

