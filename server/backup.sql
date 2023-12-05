PGDMP                      {         	   skinguard    16.0    16.0 :    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16536 	   skinguard    DATABASE     �   CREATE DATABASE skinguard WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Ukrainian_Ukraine.1251';
    DROP DATABASE skinguard;
                postgres    false            S           1247    18380    schedule_time_enum    TYPE     P   CREATE TYPE public.schedule_time_enum AS ENUM (
    'evening',
    'morning'
);
 %   DROP TYPE public.schedule_time_enum;
       public          postgres    false            V           1247    18386    user_role_enum    TYPE     X   CREATE TYPE public.user_role_enum AS ENUM (
    'admin',
    'patient',
    'doctor'
);
 !   DROP TYPE public.user_role_enum;
       public          postgres    false            �            1259    18393    doctor    TABLE     �   CREATE TABLE public.doctor (
    name character varying,
    work character varying,
    description character varying,
    doctor_id integer NOT NULL,
    user_id integer,
    specialization character varying,
    photo character varying
);
    DROP TABLE public.doctor;
       public         heap    postgres    false            �            1259    18398    doctor_doctor_id_seq    SEQUENCE     �   CREATE SEQUENCE public.doctor_doctor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.doctor_doctor_id_seq;
       public          postgres    false    215            �           0    0    doctor_doctor_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.doctor_doctor_id_seq OWNED BY public.doctor.doctor_id;
          public          postgres    false    216            �            1259    18399    doctors_request    TABLE     �   CREATE TABLE public.doctors_request (
    request_id integer NOT NULL,
    coverletter character varying NOT NULL,
    patient_id integer,
    doctor_id integer,
    "createAt" timestamp without time zone DEFAULT now() NOT NULL
);
 #   DROP TABLE public.doctors_request;
       public         heap    postgres    false            �            1259    18405    doctors_request_request_id_seq    SEQUENCE     �   CREATE SEQUENCE public.doctors_request_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.doctors_request_request_id_seq;
       public          postgres    false    217            �           0    0    doctors_request_request_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.doctors_request_request_id_seq OWNED BY public.doctors_request.request_id;
          public          postgres    false    218            �            1259    18406    patient    TABLE     �   CREATE TABLE public.patient (
    name character varying,
    "skinType" character varying,
    patient_id integer NOT NULL,
    user_id integer,
    doctor_id integer,
    age integer,
    photo character varying
);
    DROP TABLE public.patient;
       public         heap    postgres    false            �            1259    18411    patient_patient_id_seq    SEQUENCE     �   CREATE SEQUENCE public.patient_patient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.patient_patient_id_seq;
       public          postgres    false    219            �           0    0    patient_patient_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.patient_patient_id_seq OWNED BY public.patient.patient_id;
          public          postgres    false    220            �            1259    18412    product    TABLE     k  CREATE TABLE public.product (
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
       public         heap    postgres    false            �            1259    18417    product_product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.product_product_id_seq;
       public          postgres    false    221                        0    0    product_product_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.product_product_id_seq OWNED BY public.product.product_id;
          public          postgres    false    222            �            1259    18418    schedule    TABLE     �   CREATE TABLE public.schedule (
    schedule_id integer NOT NULL,
    "time" public.schedule_time_enum DEFAULT 'morning'::public.schedule_time_enum NOT NULL,
    patient_id integer,
    product_id integer,
    description character varying
);
    DROP TABLE public.schedule;
       public         heap    postgres    false    851    851            �            1259    18424    schedule_schedule_id_seq    SEQUENCE     �   CREATE SEQUENCE public.schedule_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.schedule_schedule_id_seq;
       public          postgres    false    223                       0    0    schedule_schedule_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.schedule_schedule_id_seq OWNED BY public.schedule.schedule_id;
          public          postgres    false    224            �            1259    18425    user    TABLE     !  CREATE TABLE public."user" (
    user_id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "createAt" timestamp without time zone DEFAULT now() NOT NULL,
    role public.user_role_enum DEFAULT 'patient'::public.user_role_enum NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false    854    854            �            1259    18432    user_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_user_id_seq;
       public          postgres    false    225                       0    0    user_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;
          public          postgres    false    226            9           2604    18433    doctor doctor_id    DEFAULT     t   ALTER TABLE ONLY public.doctor ALTER COLUMN doctor_id SET DEFAULT nextval('public.doctor_doctor_id_seq'::regclass);
 ?   ALTER TABLE public.doctor ALTER COLUMN doctor_id DROP DEFAULT;
       public          postgres    false    216    215            :           2604    18434    doctors_request request_id    DEFAULT     �   ALTER TABLE ONLY public.doctors_request ALTER COLUMN request_id SET DEFAULT nextval('public.doctors_request_request_id_seq'::regclass);
 I   ALTER TABLE public.doctors_request ALTER COLUMN request_id DROP DEFAULT;
       public          postgres    false    218    217            <           2604    18435    patient patient_id    DEFAULT     x   ALTER TABLE ONLY public.patient ALTER COLUMN patient_id SET DEFAULT nextval('public.patient_patient_id_seq'::regclass);
 A   ALTER TABLE public.patient ALTER COLUMN patient_id DROP DEFAULT;
       public          postgres    false    220    219            =           2604    18436    product product_id    DEFAULT     x   ALTER TABLE ONLY public.product ALTER COLUMN product_id SET DEFAULT nextval('public.product_product_id_seq'::regclass);
 A   ALTER TABLE public.product ALTER COLUMN product_id DROP DEFAULT;
       public          postgres    false    222    221            >           2604    18437    schedule schedule_id    DEFAULT     |   ALTER TABLE ONLY public.schedule ALTER COLUMN schedule_id SET DEFAULT nextval('public.schedule_schedule_id_seq'::regclass);
 C   ALTER TABLE public.schedule ALTER COLUMN schedule_id DROP DEFAULT;
       public          postgres    false    224    223            @           2604    18438    user user_id    DEFAULT     n   ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);
 =   ALTER TABLE public."user" ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    226    225            �          0    18393    doctor 
   TABLE DATA           d   COPY public.doctor (name, work, description, doctor_id, user_id, specialization, photo) FROM stdin;
    public          postgres    false    215   �H       �          0    18399    doctors_request 
   TABLE DATA           e   COPY public.doctors_request (request_id, coverletter, patient_id, doctor_id, "createAt") FROM stdin;
    public          postgres    false    217   �I       �          0    18406    patient 
   TABLE DATA           _   COPY public.patient (name, "skinType", patient_id, user_id, doctor_id, age, photo) FROM stdin;
    public          postgres    false    219   VJ       �          0    18412    product 
   TABLE DATA           ~   COPY public.product (product_id, name, "productType", brand, description, amount, ingredients, "skinType", photo) FROM stdin;
    public          postgres    false    221   �J       �          0    18418    schedule 
   TABLE DATA           \   COPY public.schedule (schedule_id, "time", patient_id, product_id, description) FROM stdin;
    public          postgres    false    223   5M       �          0    18425    user 
   TABLE DATA           L   COPY public."user" (user_id, email, password, "createAt", role) FROM stdin;
    public          postgres    false    225   fM                  0    0    doctor_doctor_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.doctor_doctor_id_seq', 11, true);
          public          postgres    false    216                       0    0    doctors_request_request_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.doctors_request_request_id_seq', 23, true);
          public          postgres    false    218                       0    0    patient_patient_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.patient_patient_id_seq', 26, true);
          public          postgres    false    220                       0    0    product_product_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.product_product_id_seq', 24, true);
          public          postgres    false    222                       0    0    schedule_schedule_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.schedule_schedule_id_seq', 22, true);
          public          postgres    false    224                       0    0    user_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_user_id_seq', 36, true);
          public          postgres    false    226            P           2606    18440 &   product PK_1de6a4421ff0c410d75af27aeee 
   CONSTRAINT     n   ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY (product_id);
 R   ALTER TABLE ONLY public.product DROP CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee";
       public            postgres    false    221            H           2606    18442 .   doctors_request PK_587c3261789a4d54fc4bbc0c2ab 
   CONSTRAINT     v   ALTER TABLE ONLY public.doctors_request
    ADD CONSTRAINT "PK_587c3261789a4d54fc4bbc0c2ab" PRIMARY KEY (request_id);
 Z   ALTER TABLE ONLY public.doctors_request DROP CONSTRAINT "PK_587c3261789a4d54fc4bbc0c2ab";
       public            postgres    false    217            T           2606    18444 #   user PK_758b8ce7c18b9d347461b30228d 
   CONSTRAINT     j   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY (user_id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_758b8ce7c18b9d347461b30228d";
       public            postgres    false    225            L           2606    18446 &   patient PK_bd1c8f471a2198c19f43987ab05 
   CONSTRAINT     n   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "PK_bd1c8f471a2198c19f43987ab05" PRIMARY KEY (patient_id);
 R   ALTER TABLE ONLY public.patient DROP CONSTRAINT "PK_bd1c8f471a2198c19f43987ab05";
       public            postgres    false    219            D           2606    18448 %   doctor PK_e2959c517497025482609c0166c 
   CONSTRAINT     l   ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "PK_e2959c517497025482609c0166c" PRIMARY KEY (doctor_id);
 Q   ALTER TABLE ONLY public.doctor DROP CONSTRAINT "PK_e2959c517497025482609c0166c";
       public            postgres    false    215            R           2606    18450 '   schedule PK_e2f8b8dde7d240896cd58c669a2 
   CONSTRAINT     p   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "PK_e2f8b8dde7d240896cd58c669a2" PRIMARY KEY (schedule_id);
 S   ALTER TABLE ONLY public.schedule DROP CONSTRAINT "PK_e2f8b8dde7d240896cd58c669a2";
       public            postgres    false    223            F           2606    18452 %   doctor UQ_a685e79dc974f768c39e5d12281 
   CONSTRAINT     e   ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "UQ_a685e79dc974f768c39e5d12281" UNIQUE (user_id);
 Q   ALTER TABLE ONLY public.doctor DROP CONSTRAINT "UQ_a685e79dc974f768c39e5d12281";
       public            postgres    false    215            J           2606    18454 .   doctors_request UQ_ba8677d9e3a92b7022af30b86b1 
   CONSTRAINT     q   ALTER TABLE ONLY public.doctors_request
    ADD CONSTRAINT "UQ_ba8677d9e3a92b7022af30b86b1" UNIQUE (patient_id);
 Z   ALTER TABLE ONLY public.doctors_request DROP CONSTRAINT "UQ_ba8677d9e3a92b7022af30b86b1";
       public            postgres    false    217            N           2606    18456 &   patient UQ_f20f0bf6b734938c710e12c2782 
   CONSTRAINT     f   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "UQ_f20f0bf6b734938c710e12c2782" UNIQUE (user_id);
 R   ALTER TABLE ONLY public.patient DROP CONSTRAINT "UQ_f20f0bf6b734938c710e12c2782";
       public            postgres    false    219            Z           2606    18457 '   schedule FK_1b6578447e28e549246ff433d53    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "FK_1b6578447e28e549246ff433d53" FOREIGN KEY (product_id) REFERENCES public.product(product_id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.schedule DROP CONSTRAINT "FK_1b6578447e28e549246ff433d53";
       public          postgres    false    4688    223    221            [           2606    18462 '   schedule FK_2390a191e9a9b2de3bfc002bf12    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "FK_2390a191e9a9b2de3bfc002bf12" FOREIGN KEY (patient_id) REFERENCES public.patient(patient_id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.schedule DROP CONSTRAINT "FK_2390a191e9a9b2de3bfc002bf12";
       public          postgres    false    219    223    4684            U           2606    18467 %   doctor FK_a685e79dc974f768c39e5d12281    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "FK_a685e79dc974f768c39e5d12281" FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.doctor DROP CONSTRAINT "FK_a685e79dc974f768c39e5d12281";
       public          postgres    false    4692    225    215            V           2606    18472 .   doctors_request FK_ba8677d9e3a92b7022af30b86b1    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctors_request
    ADD CONSTRAINT "FK_ba8677d9e3a92b7022af30b86b1" FOREIGN KEY (patient_id) REFERENCES public.patient(patient_id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.doctors_request DROP CONSTRAINT "FK_ba8677d9e3a92b7022af30b86b1";
       public          postgres    false    4684    217    219            X           2606    18477 &   patient FK_e10105a04a8a381baec6ba1fc6a    FK CONSTRAINT     �   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "FK_e10105a04a8a381baec6ba1fc6a" FOREIGN KEY (doctor_id) REFERENCES public.doctor(doctor_id) ON DELETE SET NULL;
 R   ALTER TABLE ONLY public.patient DROP CONSTRAINT "FK_e10105a04a8a381baec6ba1fc6a";
       public          postgres    false    219    4676    215            W           2606    18482 .   doctors_request FK_ea9a69f0e172e5a62657ffd22eb    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctors_request
    ADD CONSTRAINT "FK_ea9a69f0e172e5a62657ffd22eb" FOREIGN KEY (doctor_id) REFERENCES public.doctor(doctor_id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.doctors_request DROP CONSTRAINT "FK_ea9a69f0e172e5a62657ffd22eb";
       public          postgres    false    217    4676    215            Y           2606    18487 &   patient FK_f20f0bf6b734938c710e12c2782    FK CONSTRAINT     �   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "FK_f20f0bf6b734938c710e12c2782" FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.patient DROP CONSTRAINT "FK_f20f0bf6b734938c710e12c2782";
       public          postgres    false    219    225    4692            �   �   x�U̽� @���� b����E_��
�S�M��M�.�N�%�]":������5�t����ZG�6L~��|���"Hy]C�����n]R�ʿ1���[��ev���8n����k�e"/�e�z-V�k���]{aPK]�A�#����'��H:N� +�>�      �   �   x�m�A�  ����䩄]X
����&-4���z�L�L�ȵcox)����k��J�@��ہx0��sI��ް��^ss ��&$GGv���T�p¼`m5/��*y-ޏ��;.8m{���
�F-ш�:k���?8*      �   y   x��1�0������"IIձc�X�&R#Q#���{����9F�'�~����#=����kY�G�k�޼�T|D�*�2-_�,�Ja�ezo;om���Er�b�����BD�$�      �   F  x���Ks�0 ��:�3�lLS��#I�!�i�-�E^�ZYK�Hp~}C�4? .:y,����7�Q�%s|[Ke�>�A�L��]r?O�a����O�����J�ā�Z�1zP���*Tb��ߢ����"�C�kGv�/"��_[؉o�%�dpbl��M���{3����yҷ�8�Z�Aq�kI����T���F[�ḉ���*�
^��?�u�V$�A�5���ex+��y�ܻٟ���)<�R������CC~��9Vh���zD�̃XXUYr�A\kzB�惁��;#.�����Ac�i�֨5i��X"��E��l�NqMFZ������܁�z]����]�x���A��q-���n�4Q��R��*���܁�R�Ӥ����}�%:t����8��S傔�����1�gj��M��nBJ�,���*̒9�%F�'��7�I��i���P_��F}Q������o���#���G_{/p���}���o.Z [vݠ<��'וT���K(e���v��NQםˬ_�E?/����Z����1���� ����p�����3	<ܬ?E�Q��n�E�G�}��j� p�j      �   !   x�32���/���K�44�44������� V�      �   �  x���ɒ�P ��>E/ؙ�;2UuU�@�Q��Q&�Q�O�N%�Nze����s�4ʾ�]��<�1n��|��&}a)���)^3�Os��J��z6�1�������4�Eo�ȫ��;(�G縱����V�t�C �g�z�H�H�����/L�^�6�)kN����㼙������Ԅ�[�[.�1iy�$�n���}uq�|�������'�\n���ݕ`�7>C�	A��! �@���#�	��2�q
<+�B�4�����%+�h\[UU+��Ƹ�K=��e#7��������B$<��~�����z67�6����o�tRx�i��Lz��Iu�[���.�{����VA��E��Fa���?0,R,~�
�#�>F������,iێ�%������{1���ĴTi��� �h[�䨖/��r�0-�0K1+��>�"��fXx;��޾�N#?i�����mt�.*����Q�2k~��W8G=w�|voe���ī��V7Sw�,��jp��Cπ>^�X$�[Pȁ��������A\�=����L!��ӌ�X��W�X���ޡ&Tj�n'S##���$��6����g�08�
܇��K���'v}��Pbm�����o���ى���&i�ک�H�_hȫ�"gV(��a}��'�DJ��
t߆�~���u�     