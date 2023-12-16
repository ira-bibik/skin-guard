PGDMP  1    )                {         	   skinguard    16.0    16.0 :    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16536 	   skinguard    DATABASE     �   CREATE DATABASE skinguard WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Ukrainian_Ukraine.1251';
    DROP DATABASE skinguard;
                postgres    false            S           1247    19405    schedule_time_enum    TYPE     P   CREATE TYPE public.schedule_time_enum AS ENUM (
    'evening',
    'morning'
);
 %   DROP TYPE public.schedule_time_enum;
       public          postgres    false            V           1247    19410    user_role_enum    TYPE     X   CREATE TYPE public.user_role_enum AS ENUM (
    'admin',
    'patient',
    'doctor'
);
 !   DROP TYPE public.user_role_enum;
       public          postgres    false            �            1259    19417    doctor    TABLE     �   CREATE TABLE public.doctor (
    name character varying,
    work character varying,
    description character varying,
    doctor_id integer NOT NULL,
    user_id integer,
    specialization character varying,
    photo character varying
);
    DROP TABLE public.doctor;
       public         heap    postgres    false            �            1259    19422    doctor_doctor_id_seq    SEQUENCE     �   CREATE SEQUENCE public.doctor_doctor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.doctor_doctor_id_seq;
       public          postgres    false    215            �           0    0    doctor_doctor_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.doctor_doctor_id_seq OWNED BY public.doctor.doctor_id;
          public          postgres    false    216            �            1259    19423    doctors_request    TABLE     �   CREATE TABLE public.doctors_request (
    request_id integer NOT NULL,
    coverletter character varying NOT NULL,
    patient_id integer,
    doctor_id integer,
    "createAt" timestamp without time zone DEFAULT now() NOT NULL
);
 #   DROP TABLE public.doctors_request;
       public         heap    postgres    false            �            1259    19429    doctors_request_request_id_seq    SEQUENCE     �   CREATE SEQUENCE public.doctors_request_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.doctors_request_request_id_seq;
       public          postgres    false    217            �           0    0    doctors_request_request_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.doctors_request_request_id_seq OWNED BY public.doctors_request.request_id;
          public          postgres    false    218            �            1259    19430    patient    TABLE     �   CREATE TABLE public.patient (
    name character varying,
    "skinType" character varying,
    patient_id integer NOT NULL,
    user_id integer,
    doctor_id integer,
    age integer,
    photo character varying
);
    DROP TABLE public.patient;
       public         heap    postgres    false            �            1259    19435    patient_patient_id_seq    SEQUENCE     �   CREATE SEQUENCE public.patient_patient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.patient_patient_id_seq;
       public          postgres    false    219            �           0    0    patient_patient_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.patient_patient_id_seq OWNED BY public.patient.patient_id;
          public          postgres    false    220            �            1259    19436    product    TABLE     k  CREATE TABLE public.product (
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
       public         heap    postgres    false            �            1259    19441    product_product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.product_product_id_seq;
       public          postgres    false    221                        0    0    product_product_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.product_product_id_seq OWNED BY public.product.product_id;
          public          postgres    false    222            �            1259    19442    schedule    TABLE     �   CREATE TABLE public.schedule (
    schedule_id integer NOT NULL,
    "time" public.schedule_time_enum DEFAULT 'morning'::public.schedule_time_enum NOT NULL,
    patient_id integer,
    product_id integer,
    description character varying
);
    DROP TABLE public.schedule;
       public         heap    postgres    false    851    851            �            1259    19448    schedule_schedule_id_seq    SEQUENCE     �   CREATE SEQUENCE public.schedule_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.schedule_schedule_id_seq;
       public          postgres    false    223                       0    0    schedule_schedule_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.schedule_schedule_id_seq OWNED BY public.schedule.schedule_id;
          public          postgres    false    224            �            1259    19449    user    TABLE     !  CREATE TABLE public."user" (
    user_id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "createAt" timestamp without time zone DEFAULT now() NOT NULL,
    role public.user_role_enum DEFAULT 'patient'::public.user_role_enum NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false    854    854            �            1259    19456    user_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_user_id_seq;
       public          postgres    false    225                       0    0    user_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;
          public          postgres    false    226            9           2604    19457    doctor doctor_id    DEFAULT     t   ALTER TABLE ONLY public.doctor ALTER COLUMN doctor_id SET DEFAULT nextval('public.doctor_doctor_id_seq'::regclass);
 ?   ALTER TABLE public.doctor ALTER COLUMN doctor_id DROP DEFAULT;
       public          postgres    false    216    215            :           2604    19458    doctors_request request_id    DEFAULT     �   ALTER TABLE ONLY public.doctors_request ALTER COLUMN request_id SET DEFAULT nextval('public.doctors_request_request_id_seq'::regclass);
 I   ALTER TABLE public.doctors_request ALTER COLUMN request_id DROP DEFAULT;
       public          postgres    false    218    217            <           2604    19459    patient patient_id    DEFAULT     x   ALTER TABLE ONLY public.patient ALTER COLUMN patient_id SET DEFAULT nextval('public.patient_patient_id_seq'::regclass);
 A   ALTER TABLE public.patient ALTER COLUMN patient_id DROP DEFAULT;
       public          postgres    false    220    219            =           2604    19460    product product_id    DEFAULT     x   ALTER TABLE ONLY public.product ALTER COLUMN product_id SET DEFAULT nextval('public.product_product_id_seq'::regclass);
 A   ALTER TABLE public.product ALTER COLUMN product_id DROP DEFAULT;
       public          postgres    false    222    221            >           2604    19461    schedule schedule_id    DEFAULT     |   ALTER TABLE ONLY public.schedule ALTER COLUMN schedule_id SET DEFAULT nextval('public.schedule_schedule_id_seq'::regclass);
 C   ALTER TABLE public.schedule ALTER COLUMN schedule_id DROP DEFAULT;
       public          postgres    false    224    223            @           2604    19462    user user_id    DEFAULT     n   ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);
 =   ALTER TABLE public."user" ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    226    225            �          0    19417    doctor 
   TABLE DATA           d   COPY public.doctor (name, work, description, doctor_id, user_id, specialization, photo) FROM stdin;
    public          postgres    false    215   �H       �          0    19423    doctors_request 
   TABLE DATA           e   COPY public.doctors_request (request_id, coverletter, patient_id, doctor_id, "createAt") FROM stdin;
    public          postgres    false    217   �I       �          0    19430    patient 
   TABLE DATA           _   COPY public.patient (name, "skinType", patient_id, user_id, doctor_id, age, photo) FROM stdin;
    public          postgres    false    219   J       �          0    19436    product 
   TABLE DATA           ~   COPY public.product (product_id, name, "productType", brand, description, amount, ingredients, "skinType", photo) FROM stdin;
    public          postgres    false    221   �J       �          0    19442    schedule 
   TABLE DATA           \   COPY public.schedule (schedule_id, "time", patient_id, product_id, description) FROM stdin;
    public          postgres    false    223   �M       �          0    19449    user 
   TABLE DATA           L   COPY public."user" (user_id, email, password, "createAt", role) FROM stdin;
    public          postgres    false    225   xN                  0    0    doctor_doctor_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.doctor_doctor_id_seq', 11, true);
          public          postgres    false    216                       0    0    doctors_request_request_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.doctors_request_request_id_seq', 24, true);
          public          postgres    false    218                       0    0    patient_patient_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.patient_patient_id_seq', 28, true);
          public          postgres    false    220                       0    0    product_product_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.product_product_id_seq', 27, true);
          public          postgres    false    222                       0    0    schedule_schedule_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.schedule_schedule_id_seq', 29, true);
          public          postgres    false    224                       0    0    user_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_user_id_seq', 38, true);
          public          postgres    false    226            P           2606    19464 &   product PK_1de6a4421ff0c410d75af27aeee 
   CONSTRAINT     n   ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY (product_id);
 R   ALTER TABLE ONLY public.product DROP CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee";
       public            postgres    false    221            H           2606    19466 .   doctors_request PK_587c3261789a4d54fc4bbc0c2ab 
   CONSTRAINT     v   ALTER TABLE ONLY public.doctors_request
    ADD CONSTRAINT "PK_587c3261789a4d54fc4bbc0c2ab" PRIMARY KEY (request_id);
 Z   ALTER TABLE ONLY public.doctors_request DROP CONSTRAINT "PK_587c3261789a4d54fc4bbc0c2ab";
       public            postgres    false    217            T           2606    19468 #   user PK_758b8ce7c18b9d347461b30228d 
   CONSTRAINT     j   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY (user_id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_758b8ce7c18b9d347461b30228d";
       public            postgres    false    225            L           2606    19470 &   patient PK_bd1c8f471a2198c19f43987ab05 
   CONSTRAINT     n   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "PK_bd1c8f471a2198c19f43987ab05" PRIMARY KEY (patient_id);
 R   ALTER TABLE ONLY public.patient DROP CONSTRAINT "PK_bd1c8f471a2198c19f43987ab05";
       public            postgres    false    219            D           2606    19472 %   doctor PK_e2959c517497025482609c0166c 
   CONSTRAINT     l   ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "PK_e2959c517497025482609c0166c" PRIMARY KEY (doctor_id);
 Q   ALTER TABLE ONLY public.doctor DROP CONSTRAINT "PK_e2959c517497025482609c0166c";
       public            postgres    false    215            R           2606    19474 '   schedule PK_e2f8b8dde7d240896cd58c669a2 
   CONSTRAINT     p   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "PK_e2f8b8dde7d240896cd58c669a2" PRIMARY KEY (schedule_id);
 S   ALTER TABLE ONLY public.schedule DROP CONSTRAINT "PK_e2f8b8dde7d240896cd58c669a2";
       public            postgres    false    223            F           2606    19476 %   doctor UQ_a685e79dc974f768c39e5d12281 
   CONSTRAINT     e   ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "UQ_a685e79dc974f768c39e5d12281" UNIQUE (user_id);
 Q   ALTER TABLE ONLY public.doctor DROP CONSTRAINT "UQ_a685e79dc974f768c39e5d12281";
       public            postgres    false    215            J           2606    19478 .   doctors_request UQ_ba8677d9e3a92b7022af30b86b1 
   CONSTRAINT     q   ALTER TABLE ONLY public.doctors_request
    ADD CONSTRAINT "UQ_ba8677d9e3a92b7022af30b86b1" UNIQUE (patient_id);
 Z   ALTER TABLE ONLY public.doctors_request DROP CONSTRAINT "UQ_ba8677d9e3a92b7022af30b86b1";
       public            postgres    false    217            N           2606    19480 &   patient UQ_f20f0bf6b734938c710e12c2782 
   CONSTRAINT     f   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "UQ_f20f0bf6b734938c710e12c2782" UNIQUE (user_id);
 R   ALTER TABLE ONLY public.patient DROP CONSTRAINT "UQ_f20f0bf6b734938c710e12c2782";
       public            postgres    false    219            Z           2606    19481 '   schedule FK_1b6578447e28e549246ff433d53    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "FK_1b6578447e28e549246ff433d53" FOREIGN KEY (product_id) REFERENCES public.product(product_id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.schedule DROP CONSTRAINT "FK_1b6578447e28e549246ff433d53";
       public          postgres    false    223    4688    221            [           2606    19486 '   schedule FK_2390a191e9a9b2de3bfc002bf12    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "FK_2390a191e9a9b2de3bfc002bf12" FOREIGN KEY (patient_id) REFERENCES public.patient(patient_id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.schedule DROP CONSTRAINT "FK_2390a191e9a9b2de3bfc002bf12";
       public          postgres    false    4684    223    219            U           2606    19491 %   doctor FK_a685e79dc974f768c39e5d12281    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "FK_a685e79dc974f768c39e5d12281" FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.doctor DROP CONSTRAINT "FK_a685e79dc974f768c39e5d12281";
       public          postgres    false    4692    215    225            V           2606    19496 .   doctors_request FK_ba8677d9e3a92b7022af30b86b1    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctors_request
    ADD CONSTRAINT "FK_ba8677d9e3a92b7022af30b86b1" FOREIGN KEY (patient_id) REFERENCES public.patient(patient_id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.doctors_request DROP CONSTRAINT "FK_ba8677d9e3a92b7022af30b86b1";
       public          postgres    false    4684    217    219            X           2606    19501 &   patient FK_e10105a04a8a381baec6ba1fc6a    FK CONSTRAINT     �   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "FK_e10105a04a8a381baec6ba1fc6a" FOREIGN KEY (doctor_id) REFERENCES public.doctor(doctor_id) ON DELETE SET NULL;
 R   ALTER TABLE ONLY public.patient DROP CONSTRAINT "FK_e10105a04a8a381baec6ba1fc6a";
       public          postgres    false    219    215    4676            W           2606    19506 .   doctors_request FK_ea9a69f0e172e5a62657ffd22eb    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctors_request
    ADD CONSTRAINT "FK_ea9a69f0e172e5a62657ffd22eb" FOREIGN KEY (doctor_id) REFERENCES public.doctor(doctor_id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.doctors_request DROP CONSTRAINT "FK_ea9a69f0e172e5a62657ffd22eb";
       public          postgres    false    4676    217    215            Y           2606    19511 &   patient FK_f20f0bf6b734938c710e12c2782    FK CONSTRAINT     �   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "FK_f20f0bf6b734938c710e12c2782" FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.patient DROP CONSTRAINT "FK_f20f0bf6b734938c710e12c2782";
       public          postgres    false    219    4692    225            �   �   x���;n�  k|
.�0��^+m�m����ßx�%���TQ�t#M1syR�b���5�^ܮ���7,��m˶��A�UAE;}�H�E�����-zs�����4�7��Iã�ǒjRo�܌[�Hb��$7q�=�t!DI�Cީ�{��R唲<ɏ@��Ew���ѽC�`,j�x
@�	<22����xSM�|�3[      �   B   x�32��H���WT�T���NU��/�42�44�4202�54�50U0��26�26�313������� ���      �   �   x�%�=�0���)�@B�H��� 6���b`�����yž��w@�"�8�� K|�����m7�4��tQ��6`ʘ&��?�6xR������W�tr���,�7�������M3�B����<�MQ�Gn/��%����>�'�i����5�Ri����ʮ�zk.V��򲤯�#�>��>�șB~go>�      �   �  x���r�6@��W�ҙtF�$��$�N�qM����L� ��`$��T��q��<=������%�x��2�&m�W���-���wᐼk}²����s/���+��Q�,YC�����zm��\�>x���X�����;�`J���>��I�<��d�Q}G�A:UϯBo���\b�*Nɺ�����h,��e�͠�#Wp�w�6���'ǒ���l�T����� <]���l���L�d��mpu#�m���w��?���X�>��C�7�_�wO��4�w�3��~�ц=��^{L�S���J=�be#gvޢ�;��. �;��`NV�J�q�ن�bN���Q�a��(����C�0�֨��ta�Ԋ���F��mF7l����;L���ua�#�tc�^)��t��}�G��o���j�xc���̈́g��o�nJr�;d'�èzH6Щ`�8JXz2��hȲd����Ě����2c��~��#�u�m��|���I�eгn1���������\�BK��ɨ(%�e��h��R���"�h�A���3�	�c[�����)�:gE��fyƩ`Pђ��EZ�R,S:~a�>����x���j'�xfr�g���q�~t%�o���/�O)�Ĳʩ�ł
�
Z)��<K�b��������܆�6|�6$/�C�X�`G,��zA͙f�rWB�<�L<���9�~�� ���������x�+g)x�"K�#��蒉4͋��z�O��d�H8W      �   {   x��α�0�����ؐ��>�%��M����� �:20������|7�+��\K�l��Gh�S���0����!Y�Sv��N�R�,yN�����?,�Yoe�!����D~_Xv	�-3� ��CX      �   �  x���ɒ�P ��>E/ؙ�;2UuU�@�Q��Q&�Q�O�N%�Nze����s�4ʾ�]��<�1n��|��&}a)���)^3�Os��J��z6�1�������4�Eo�ȫ��;(�G縱����V�t�C �g�z�H�H�����/L�^�6�)kN����㼙������Ԅ�[�[.�1iy�$�n���}uq�|�������'�\n���ݕ`�7>C�	A��! �@���#�	��2�q
<+�B�4�����%+�h\[UU+��Ƹ�K=��e#7��������B$<��~�����z67�6����o�tRx�i��Lz��Iu�[���.�{����VA��E��Fa���?0,R,~�
�#�>F������,iێ�%������{1���ĴTi��� �h[�䨖/��r�0-�0K1+��>�"��fXx;��޾�N#?i�����mt�.*����Q�2k~��W8G=w�|voe���ī��V7Sw�,��jp��Cπ>^�X$�[Pȁ��������A\�=����L!��ӌ�X��W�X���ޡ&Tj�n'S##���$��6����g�08�
܇��K���'v}��Pbm�����o���ى���&i�ک�H�_hȫ�"gV(��a}��'�DJ��
t߆�~���u�     