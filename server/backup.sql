PGDMP                      {         	   skinguard    16.0    16.0 :    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16536 	   skinguard    DATABASE     �   CREATE DATABASE skinguard WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Ukrainian_Ukraine.1251';
    DROP DATABASE skinguard;
                postgres    false            S           1247    19518    schedule_time_enum    TYPE     P   CREATE TYPE public.schedule_time_enum AS ENUM (
    'evening',
    'morning'
);
 %   DROP TYPE public.schedule_time_enum;
       public          postgres    false            V           1247    19524    user_role_enum    TYPE     X   CREATE TYPE public.user_role_enum AS ENUM (
    'admin',
    'patient',
    'doctor'
);
 !   DROP TYPE public.user_role_enum;
       public          postgres    false            �            1259    19531    doctor    TABLE     �   CREATE TABLE public.doctor (
    name character varying,
    work character varying,
    description character varying,
    doctor_id integer NOT NULL,
    user_id integer,
    specialization character varying,
    photo character varying
);
    DROP TABLE public.doctor;
       public         heap    postgres    false            �            1259    19536    doctor_doctor_id_seq    SEQUENCE     �   CREATE SEQUENCE public.doctor_doctor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.doctor_doctor_id_seq;
       public          postgres    false    215            �           0    0    doctor_doctor_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.doctor_doctor_id_seq OWNED BY public.doctor.doctor_id;
          public          postgres    false    216            �            1259    19537    doctors_request    TABLE     �   CREATE TABLE public.doctors_request (
    request_id integer NOT NULL,
    coverletter character varying NOT NULL,
    patient_id integer,
    doctor_id integer,
    "createAt" timestamp without time zone DEFAULT now() NOT NULL
);
 #   DROP TABLE public.doctors_request;
       public         heap    postgres    false            �            1259    19543    doctors_request_request_id_seq    SEQUENCE     �   CREATE SEQUENCE public.doctors_request_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.doctors_request_request_id_seq;
       public          postgres    false    217            �           0    0    doctors_request_request_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.doctors_request_request_id_seq OWNED BY public.doctors_request.request_id;
          public          postgres    false    218            �            1259    19544    patient    TABLE     �   CREATE TABLE public.patient (
    name character varying,
    "skinType" character varying,
    patient_id integer NOT NULL,
    user_id integer,
    doctor_id integer,
    age integer,
    photo character varying
);
    DROP TABLE public.patient;
       public         heap    postgres    false            �            1259    19549    patient_patient_id_seq    SEQUENCE     �   CREATE SEQUENCE public.patient_patient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.patient_patient_id_seq;
       public          postgres    false    219            �           0    0    patient_patient_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.patient_patient_id_seq OWNED BY public.patient.patient_id;
          public          postgres    false    220            �            1259    19550    product    TABLE     k  CREATE TABLE public.product (
    product_id integer NOT NULL,
    name character varying NOT NULL,
    "productType" character varying NOT NULL,
    brand character varying NOT NULL,
    description character varying,
    amount character varying NOT NULL,
    ingredients character varying NOT NULL,
    "skinType" text NOT NULL,
    photo character varying
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    19555    product_product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.product_product_id_seq;
       public          postgres    false    221                        0    0    product_product_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.product_product_id_seq OWNED BY public.product.product_id;
          public          postgres    false    222            �            1259    19556    schedule    TABLE     �   CREATE TABLE public.schedule (
    schedule_id integer NOT NULL,
    "time" public.schedule_time_enum DEFAULT 'morning'::public.schedule_time_enum NOT NULL,
    patient_id integer,
    product_id integer,
    description character varying
);
    DROP TABLE public.schedule;
       public         heap    postgres    false    851    851            �            1259    19562    schedule_schedule_id_seq    SEQUENCE     �   CREATE SEQUENCE public.schedule_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.schedule_schedule_id_seq;
       public          postgres    false    223                       0    0    schedule_schedule_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.schedule_schedule_id_seq OWNED BY public.schedule.schedule_id;
          public          postgres    false    224            �            1259    19563    user    TABLE     !  CREATE TABLE public."user" (
    user_id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "createAt" timestamp without time zone DEFAULT now() NOT NULL,
    role public.user_role_enum DEFAULT 'patient'::public.user_role_enum NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false    854    854            �            1259    19570    user_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_user_id_seq;
       public          postgres    false    225                       0    0    user_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;
          public          postgres    false    226            9           2604    19571    doctor doctor_id    DEFAULT     t   ALTER TABLE ONLY public.doctor ALTER COLUMN doctor_id SET DEFAULT nextval('public.doctor_doctor_id_seq'::regclass);
 ?   ALTER TABLE public.doctor ALTER COLUMN doctor_id DROP DEFAULT;
       public          postgres    false    216    215            :           2604    19572    doctors_request request_id    DEFAULT     �   ALTER TABLE ONLY public.doctors_request ALTER COLUMN request_id SET DEFAULT nextval('public.doctors_request_request_id_seq'::regclass);
 I   ALTER TABLE public.doctors_request ALTER COLUMN request_id DROP DEFAULT;
       public          postgres    false    218    217            <           2604    19573    patient patient_id    DEFAULT     x   ALTER TABLE ONLY public.patient ALTER COLUMN patient_id SET DEFAULT nextval('public.patient_patient_id_seq'::regclass);
 A   ALTER TABLE public.patient ALTER COLUMN patient_id DROP DEFAULT;
       public          postgres    false    220    219            =           2604    19574    product product_id    DEFAULT     x   ALTER TABLE ONLY public.product ALTER COLUMN product_id SET DEFAULT nextval('public.product_product_id_seq'::regclass);
 A   ALTER TABLE public.product ALTER COLUMN product_id DROP DEFAULT;
       public          postgres    false    222    221            >           2604    19575    schedule schedule_id    DEFAULT     |   ALTER TABLE ONLY public.schedule ALTER COLUMN schedule_id SET DEFAULT nextval('public.schedule_schedule_id_seq'::regclass);
 C   ALTER TABLE public.schedule ALTER COLUMN schedule_id DROP DEFAULT;
       public          postgres    false    224    223            @           2604    19576    user user_id    DEFAULT     n   ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);
 =   ALTER TABLE public."user" ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    226    225            �          0    19531    doctor 
   TABLE DATA           d   COPY public.doctor (name, work, description, doctor_id, user_id, specialization, photo) FROM stdin;
    public          postgres    false    215   �H       �          0    19537    doctors_request 
   TABLE DATA           e   COPY public.doctors_request (request_id, coverletter, patient_id, doctor_id, "createAt") FROM stdin;
    public          postgres    false    217   J       �          0    19544    patient 
   TABLE DATA           _   COPY public.patient (name, "skinType", patient_id, user_id, doctor_id, age, photo) FROM stdin;
    public          postgres    false    219   fJ       �          0    19550    product 
   TABLE DATA           ~   COPY public.product (product_id, name, "productType", brand, description, amount, ingredients, "skinType", photo) FROM stdin;
    public          postgres    false    221   _K       �          0    19556    schedule 
   TABLE DATA           \   COPY public.schedule (schedule_id, "time", patient_id, product_id, description) FROM stdin;
    public          postgres    false    223   MU       �          0    19563    user 
   TABLE DATA           L   COPY public."user" (user_id, email, password, "createAt", role) FROM stdin;
    public          postgres    false    225   �U                  0    0    doctor_doctor_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.doctor_doctor_id_seq', 12, true);
          public          postgres    false    216                       0    0    doctors_request_request_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.doctors_request_request_id_seq', 25, true);
          public          postgres    false    218                       0    0    patient_patient_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.patient_patient_id_seq', 28, true);
          public          postgres    false    220                       0    0    product_product_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.product_product_id_seq', 28, true);
          public          postgres    false    222                       0    0    schedule_schedule_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.schedule_schedule_id_seq', 30, true);
          public          postgres    false    224                       0    0    user_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_user_id_seq', 39, true);
          public          postgres    false    226            P           2606    19578 &   product PK_1de6a4421ff0c410d75af27aeee 
   CONSTRAINT     n   ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY (product_id);
 R   ALTER TABLE ONLY public.product DROP CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee";
       public            postgres    false    221            H           2606    19580 .   doctors_request PK_587c3261789a4d54fc4bbc0c2ab 
   CONSTRAINT     v   ALTER TABLE ONLY public.doctors_request
    ADD CONSTRAINT "PK_587c3261789a4d54fc4bbc0c2ab" PRIMARY KEY (request_id);
 Z   ALTER TABLE ONLY public.doctors_request DROP CONSTRAINT "PK_587c3261789a4d54fc4bbc0c2ab";
       public            postgres    false    217            T           2606    19582 #   user PK_758b8ce7c18b9d347461b30228d 
   CONSTRAINT     j   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY (user_id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_758b8ce7c18b9d347461b30228d";
       public            postgres    false    225            L           2606    19584 &   patient PK_bd1c8f471a2198c19f43987ab05 
   CONSTRAINT     n   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "PK_bd1c8f471a2198c19f43987ab05" PRIMARY KEY (patient_id);
 R   ALTER TABLE ONLY public.patient DROP CONSTRAINT "PK_bd1c8f471a2198c19f43987ab05";
       public            postgres    false    219            D           2606    19586 %   doctor PK_e2959c517497025482609c0166c 
   CONSTRAINT     l   ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "PK_e2959c517497025482609c0166c" PRIMARY KEY (doctor_id);
 Q   ALTER TABLE ONLY public.doctor DROP CONSTRAINT "PK_e2959c517497025482609c0166c";
       public            postgres    false    215            R           2606    19588 '   schedule PK_e2f8b8dde7d240896cd58c669a2 
   CONSTRAINT     p   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "PK_e2f8b8dde7d240896cd58c669a2" PRIMARY KEY (schedule_id);
 S   ALTER TABLE ONLY public.schedule DROP CONSTRAINT "PK_e2f8b8dde7d240896cd58c669a2";
       public            postgres    false    223            F           2606    19590 %   doctor UQ_a685e79dc974f768c39e5d12281 
   CONSTRAINT     e   ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "UQ_a685e79dc974f768c39e5d12281" UNIQUE (user_id);
 Q   ALTER TABLE ONLY public.doctor DROP CONSTRAINT "UQ_a685e79dc974f768c39e5d12281";
       public            postgres    false    215            J           2606    19592 .   doctors_request UQ_ba8677d9e3a92b7022af30b86b1 
   CONSTRAINT     q   ALTER TABLE ONLY public.doctors_request
    ADD CONSTRAINT "UQ_ba8677d9e3a92b7022af30b86b1" UNIQUE (patient_id);
 Z   ALTER TABLE ONLY public.doctors_request DROP CONSTRAINT "UQ_ba8677d9e3a92b7022af30b86b1";
       public            postgres    false    217            N           2606    19594 &   patient UQ_f20f0bf6b734938c710e12c2782 
   CONSTRAINT     f   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "UQ_f20f0bf6b734938c710e12c2782" UNIQUE (user_id);
 R   ALTER TABLE ONLY public.patient DROP CONSTRAINT "UQ_f20f0bf6b734938c710e12c2782";
       public            postgres    false    219            Z           2606    19595 '   schedule FK_1b6578447e28e549246ff433d53    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "FK_1b6578447e28e549246ff433d53" FOREIGN KEY (product_id) REFERENCES public.product(product_id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.schedule DROP CONSTRAINT "FK_1b6578447e28e549246ff433d53";
       public          postgres    false    223    4688    221            [           2606    19600 '   schedule FK_2390a191e9a9b2de3bfc002bf12    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "FK_2390a191e9a9b2de3bfc002bf12" FOREIGN KEY (patient_id) REFERENCES public.patient(patient_id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.schedule DROP CONSTRAINT "FK_2390a191e9a9b2de3bfc002bf12";
       public          postgres    false    4684    223    219            U           2606    19605 %   doctor FK_a685e79dc974f768c39e5d12281    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "FK_a685e79dc974f768c39e5d12281" FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.doctor DROP CONSTRAINT "FK_a685e79dc974f768c39e5d12281";
       public          postgres    false    4692    215    225            V           2606    19610 .   doctors_request FK_ba8677d9e3a92b7022af30b86b1    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctors_request
    ADD CONSTRAINT "FK_ba8677d9e3a92b7022af30b86b1" FOREIGN KEY (patient_id) REFERENCES public.patient(patient_id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.doctors_request DROP CONSTRAINT "FK_ba8677d9e3a92b7022af30b86b1";
       public          postgres    false    4684    217    219            X           2606    19615 &   patient FK_e10105a04a8a381baec6ba1fc6a    FK CONSTRAINT     �   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "FK_e10105a04a8a381baec6ba1fc6a" FOREIGN KEY (doctor_id) REFERENCES public.doctor(doctor_id) ON DELETE SET NULL;
 R   ALTER TABLE ONLY public.patient DROP CONSTRAINT "FK_e10105a04a8a381baec6ba1fc6a";
       public          postgres    false    219    215    4676            W           2606    19620 .   doctors_request FK_ea9a69f0e172e5a62657ffd22eb    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctors_request
    ADD CONSTRAINT "FK_ea9a69f0e172e5a62657ffd22eb" FOREIGN KEY (doctor_id) REFERENCES public.doctor(doctor_id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.doctors_request DROP CONSTRAINT "FK_ea9a69f0e172e5a62657ffd22eb";
       public          postgres    false    4676    217    215            Y           2606    19625 &   patient FK_f20f0bf6b734938c710e12c2782    FK CONSTRAINT     �   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "FK_f20f0bf6b734938c710e12c2782" FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.patient DROP CONSTRAINT "FK_f20f0bf6b734938c710e12c2782";
       public          postgres    false    219    4692    225            �     x���;R�0��Z^�6p=m��$�L��a�ؑ<��'�83w��c$��2�qt�#�)qZץ<m6e�p���"k<�g��^j��&%o�:�@����Cg�G�]#{�2,����m�m�E�ϣ'��}�N�5�s���-�@� ���4�a,�_<��j���ƀB��ڻ���lδ�N����:j.>8T��`��-=�5PB�Hah�2��0����J�w�虿c:��K�R�B
��H�2��w����Ԉ:      �   B   x�32��H���WT�T���NU��/�42�44�4202�54�50U0��26�26�313������� ���      �   �   x��OKr� ]�S�����:�M7I�����&�c����k'�BZH�{���ie(��Ӂ�OK"8�����\o����(ϔW�nu�b �P����������m��P
PB7�c~���g��;MA�BЍ~�D�Y��{�������Bs݄�+�G[z����~�q�c7̃��-;^;�=z��g��?f���Cjxp�r�k��E�=)�w��;�����y6
�cj�I0�� FJ\)      �   �	  x��X�n�8}v��X��:��8v�'M�M�vg���,"����:���þ���|ɞKI���`�m1�4����{�=�\�ޭٳU�n��Xfl���Q)��J䥲=<�榴����^xdio�s%N��H����u�.�:W�lm"]e�VT����r	�Y��W�\8,Y��.���lq���o�0��U�.��er��Vڝ�*��Gg�t��ru�r�n�Z������&��*�e3�c��օ3��Zt�{nj��*���������J�pe%ҪtV�_|��f�z%>�H�\��Ƹ���*7.!��Z�9v�\R>�+�3kJ���I�^٣+l oB��;��TU��,u
��M��'%��*���k�d��"wF爃(l�"]��)�z��� >X�&�L��S���ƭ%�I���[�(ri2����!j2��*z|��.+)u���*�l���ö�ͬ߃�5^ں�8W�����D�6�þ��g�h_���΢�p4�*�^�F|+�!��a�'�T�9��ʽEb���նx18�-� � a���%���S璅/)�@w�I{ke���I���ñu�۩ҩ�}(�N����YQ�5,V{�J��U,R1��K�S-�*6X�(�H�V����?�+���*��1,�p�>iGqesTU%�%+�u�Č�%�E\�ceb�4�!L�?M+<TyNg(��v	Ci��dU*�W@�����0��%��G�"g"��tX���jW��Ee'3ON�{À���N��s�+Tޓ1��z^�>���Бu�a�1��P �F��EQ]�.wSe���}�v�MR9��2��y�#�kOY%(��Z�zz�'��^�R�%�!�ɶ�]d�{ 5�nc>�Ǌ��P��vr^����$T�_#�*Gz��o��'x/���_�����3j��A��uU�_@�z�8�ޜp� 0kS�,�T*όe���o�7�dp�DA�����! g�r	���be�3T�.�è��q: u��<<|j"�	\�!-P�5N�����}:��%��-5�Z� �`|S�ZKF|9okT�O9>̤�Tw�r�Fˊ���0*��9X��K��	���R���xc���`�� =n���i��A�0�NF�j0l'�<�#>
ŔO�@��`b߄�`xx�����G�P�;n��ꂭS�
�ɝ(z����������Ŭ��Ʉ�T�n[ w�JЄ���5��[�X�7���u�oq��#T�a���K��RT��X��+��+����9��g��.�]E{>	�h�[�!dй���y̧�@���N���Eَ����8-�Rw��^�˷3v����}r��͋��x�k	2Z�߯`���ո=��3hRN�#��g��~�!�P��R�bUi�D�4� y"vi0~)��7iU��~E�Fm��e�nT�h��'�g�Ε|`'� iyg�7x�Q�{��zS�RQ&��7��<�):~e
�|���7&E14;K�]Ό.Z�ge�u��'�5�W=H�{Q�t-������?`�ڑ\�tZ�fM���q��$S�%Ѧ�ZDƬB�-	���U��ק�ّ#���/�|�,��.Ja�i^��p!�@N^�,!��<T%NJ�ݡ4dByy�t��K@�S�U��DHTI�|'P�>I uk�	f�	�	;!�uڒ71��ο¿���*�$���TJLu���fOn������ڲC#Lu���C<#�ݴ0�F�D%�/��x�!?C>��xx.�1F����Td?Q�o���������b}{�Y.|s�\�������z�y?���_�.f��Ż����f�\�i��ŧ�X��M'�����5hB�ؠzo�#�F�+�ڑ�/x�$u�-�	��4���z+`��(�>	ⶠ�>EW!����rTcdx��S;��%�;e;�����*uT�����;6��/��#J�^`˯!q�K�8Mg��U}�����w�Qg���'��ԅ���r*�Ӗξy|Wk�<z(9������B>�8l�z�� 5Gd���|�ԙ/e���WO*���*ӈ�-���J�Z��5R�@���˿��i]�����nw����匏ޑvt����Cf�8��쟙�6e}�t�G7&��ٝ~l�)�N�����{�&�hakzkLC��A,�̉R��54ؖ��/a���r�	b��"!m��䍡3���_k�7�η�qJՃ��O��[E%&)R�H���͙���������t�ȃ�~����7:�p�)��ZT��c�����OA��tڳ_
�C6�]E6W4vr�)I�U)4-:X�z����`���+�H�$�0i�cY
n�}�Ƌ��FE�4B�N���(�����$���?c	Os[3�ݴ[0t��n��;�Y�<��лG#����o�È���\D6���2~�A��P5�,�����o���x��V�ƴ�Ĭ��M�g�X)��qt!�x��|4�L��L�<�AL���E�$��"�c�ŋ�ҁ�h      �   �   x���1�0�W\G��q=|���`��wQ�����͎j ����j�j8
�
��Q(��AS(&�*nro�j��pr1
�N���~q}�.bf˹�����j�.{����n7_��3����L����~;�
^ֈ�I�      �   �  x����r�H ��>E�<�[U�E�����٠(wA@a|�I�$㙬������y|�+��8�Eޣ�*,�(�����#��~5o��S��PD	X2��R5<S�!S�]���z���։�u\�[]�!sJϞ���j�z ��W�^�(a,aHs<F����#�+�&>��c��ev|��X�zP)n]}o�+��Ƥ�j�NO���}�D�����譅�g��A�f}Ŭ�Ƀ��{�@BP"�`�T}D���Br�@�w�Oz>1��&gFH�V:�����X%�ڑ�bG�0�ZS<�]��X�.D`i�X�����š)��ac�k#�u��uɰ�OFU�R�U�$�j�Y�/׍�u9�����8h�Q4���ތ��J���@s"��Ϣ���*?��������JV^}/G7�J�+C�X\b�q���Z6^ �E�ń�(\��
��GU$~lƊ�ai"
��k_4�A���A�s؉�VlYcK�B��-5F��������.+�VS���Qc6t�e��RS^M�Oz��J�
y�ʒ?t�y�$L��~���bbգ]#S�fs�1Cni����DmN~�猯w����h�w��H��@D����б���#7;��K��k����?�fAE��K��~��MQ��Kl�3	F�x���`�/�� I�MGx�`��ŇN�l��q�[龜>��כ�7̼�Z�����;�9�\E'5�Lf��"+�5p
x3Gv��'��$2Lhċ��_�����������     