/*
Grup No: 2
1- Fatma Cüre - 220601023
2- Yunus Emre Yıldırım - 220601014
3- Betül Danışmaz - 220601019
4- Ayşe Cansu Yıldırım - 220601039
5- Sena Özişci - 220601030
*/
DROP TABLE IF EXISTS admin_categorytable;
DROP TABLE IF EXISTS paymenttable;
DROP TABLE IF EXISTS methodtable;
DROP TABLE IF EXISTS orderitemtable;
DROP TABLE IF EXISTS ordertable;
DROP TABLE IF EXISTS seller_producttable;
DROP TABLE IF EXISTS producttable;
DROP TABLE IF EXISTS brandtable;
DROP TABLE IF EXISTS categorytable;
DROP TABLE IF EXISTS sellertable;
DROP TABLE IF EXISTS admintable;
DROP TABLE IF EXISTS customertable;
CREATE TABLE customertable(
	customerId int AUTO_INCREMENT NOT null,
    `name` varchar(30) NOT null,
    surname varchar(30) NOT null,
    `address` text NOT null,
    phone varchar(11),
    email varchar(50),
    `password` varchar(60) not null,
    PRIMARY KEY (customerId)
);
DELIMITER $$ /* customertable için telefon ve mail en az biri var mı diye trigger kontrolu */
CREATE TRIGGER check_customer
BEFORE INSERT ON customertable
FOR EACH ROW
BEGIN
    IF NEW.phone IS NULL AND NEW.email IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'telefon numarasi veya email girilmelidir';
    END IF;
END$$
DELIMITER ;
INSERT INTO customertable (`name`, surname, `address`, phone, email, `password`) 
VALUES 
("Merve","Aslan","Çağlayan, 34403 Kağıthane/İstanbul","05324757384","merveaslan@gmail.com","merveaslanpass"),
("Ahmet","Yılmaz","Fatih Mahallesi, 34096 Fatih/İstanbul","05419876543","ahmetyilmaz@gmail.com","ahmet123"),
("Ayşe","Kaya","Ataköy, 34158 Bakırköy/İstanbul","05548769521","aysekaya@hotmail.com","kayaayse456"),
("Mehmet","Demir","Maltepe, 34844 Maltepe/İstanbul","05341234567","mehmetdemir@yahoo.com","demirmehmet"),
("Elif","Şahin","Etiler, 34337 Beşiktaş/İstanbul","05560987654","elifshn@gmail.com","elif2023"),
("Mustafa","Çelik","Bostancı, 34744 Kadıköy/İstanbul","05435786432","mustafacelik@hotmail.com","celikmustafa"),
("Fatma","Yıldız","Pendik, 34890 Pendik/İstanbul","05327654321","fatmayildiz@gmail.com","yildiz123"),
("Ali","Kurt","Kızılay, 06420 Çankaya/Ankara","05578965432","alikurt@yahoo.com","alikurt123"),
("Zeynep","Acar","Ulus, 06050 Altındağ/Ankara","05319874567","zeynepacar@gmail.com","zeynepacar"),
("Emre","Koç","Bornova, 35040 Bornova/İzmir","05417654892","emrekoc@hotmail.com","kocemre"),
("Gamze","Eren","Konak, 35220 Konak/İzmir","05349875261","gamzeeren@gmail.com","eren123"),
("Serkan","Turan","Esentepe, 34394 Şişli/İstanbul","05478769874","serkanturan@gmail.com","turansrk"),
("Nisa","Bayrak","Tuzla, 34940 Tuzla/İstanbul","05533217659","nisabayrak@hotmail.com","bayraknisa"),
("Hakan","Durmaz","Esenler, 34220 Esenler/İstanbul","05428765987","hakandurmaz@gmail.com","durmaz123"),
("Leyla","Kılıç","Bahçelievler, 34180 Bahçelievler/İstanbul","05341239876","leylakilic@yahoo.com","kilicleyla"),
("Büşra","Yıldırım","Bayraklı, 35530 Bayraklı/İzmir","05419785643","busrayildirim@gmail.com","yildirim123"),
("Kerem","Çetin","Kadıköy, 34710 Kadıköy/İstanbul","05542139876","keremcetin@hotmail.com","cetin123"),
("Ebru","Arslan","Ümraniye, 34760 Ümraniye/İstanbul","05438765921","ebruarslan@gmail.com","arslanebru"),
("Furkan","Baş","Çekmeköy, 34788 Çekmeköy/İstanbul","05349812376","furkanbas@yahoo.com","basfurkan"),
("Deniz","Aksoy","Ataşehir, 34755 Ataşehir/İstanbul","05423987651","denizaksoy@gmail.com","aksoy123"),
("Sevgi","Tuna","Kartal, 34870 Kartal/İstanbul","05532149876","sevgituna@hotmail.com","tunasevgi"),
("Can","Bozkurt","Eyüp, 34050 Eyüp/İstanbul","05321498765","canbozkurt@gmail.com","bozkurtcan"),
("Cemre","Ersoy","Sarıyer, 34450 Sarıyer/İstanbul","05419876532","cemrersoy@yahoo.com","ersoy123"),
("Berk","Şener","Gaziosmanpaşa, 34240 Gaziosmanpaşa/İstanbul","05542139865","berksener@gmail.com","senerberk"),
("Irem","Erdoğan","Zeytinburnu, 34015 Zeytinburnu/İstanbul","05423987654","irem.erdogan@gmail.com","erdoganirem"),
("Gökhan","Uzun","Avcılar, 34320 Avcılar/İstanbul","05348765129","gokhanuzun@hotmail.com","uzungokhan"),
("Esra","Yaman","Beyoğlu, 34433 Beyoğlu/İstanbul","05543219876","esrayaman@gmail.com","yaman123"),
("Burak","Güneş","Beşiktaş, 34335 Beşiktaş/İstanbul","05321498732","burakgunes@yahoo.com","gunesburak"),
("Seda","Kara","Üsküdar, 34662 Üsküdar/İstanbul","05439876215","sedakara@gmail.com","kara123"),
("Barış","Aslan","Başakşehir, 34480 Başakşehir/İstanbul","05548763921","barisaslan@hotmail.com","aslanbaris"),
("Ezgi","Taş","Esenyurt, 34510 Esenyurt/İstanbul","05423981654","ezgitas@gmail.com","tasezgi"),
("Efe","Kurtuluş","Büyükçekmece, 34500 Büyükçekmece/İstanbul","05347821654","efekurtulus@yahoo.com","kurtulus123"),
("Yusuf","Yılmaz","Ataşehir, 34750 Ataşehir/İstanbul","05465432109","yusufyilmaz@gmail.com","yilmazyusuf"),
("Mert","Köseoğlu","İncirli, 34156 Bakırköy/İstanbul","05325687451","mertkoseoglu@yahoo.com","koseoglumert"),
("Zeynep","Demirtaş","Esenyurt, 34510 Esenyurt/İstanbul","05432176589","zeynepdemirtas@gmail.com","demirtaszeynep"),
("Selin","Aydın","Bağcılar, 34200 Bağcılar/İstanbul","05567812345","selinaydin@gmail.com","aydin123"),
("Gökhan","Sarı","Çekmeköy, 34788 Çekmeköy/İstanbul","05457864321","gokhansari@gmail.com","sari123"),
("Beyza","Çelik","Fatih, 34090 Fatih/İstanbul","05542319876","beyzacelik@gmail.com","celikbeyza"),
("Baran","Öztürk","Bahçelievler, 34180 Bahçelievler/İstanbul","05332168754","baranozturk@yahoo.com","ozturkbaran"),
("Sibel","Karakış","Kadıköy, 34720 Kadıköy/İstanbul","05476543129","sibelkarakis@gmail.com","karakis123"),
("Kaan","Turan","Üsküdar, 34662 Üsküdar/İstanbul","05347896542","kaanturan@gmail.com","turan123"),
("Deniz","Yavuz","Kartal, 34880 Kartal/İstanbul","05465431298","denizyavuz@hotmail.com","yavuz123"),
("Alperen","Gündüz","Pendik, 34890 Pendik/İstanbul","05327485123","alperengunduz@gmail.com","gunduzalperen"),
("Aylin","Aydın","Beyoğlu, 34430 Beyoğlu/İstanbul","05432167890","aylinaidin@hotmail.com","aydinaylin"),
("Berkay","Demir","Küçükçekmece, 34303 Küçükçekmece/İstanbul","05348965432","berkaydemir@gmail.com","demirberkay"),
("Sena","Aksoy","Mecidiyeköy, 34387 Şişli/İstanbul","05543212387","senaaksoy@hotmail.com","aksoysena"),
("Yusuf","Işık","Sarıyer, 34450 Sarıyer/İstanbul","05422187659","yusufisik@gmail.com","isik123"),
("Ayça","Çetin","Beylikdüzü, 34520 Beylikdüzü/İstanbul","05531098763","aycacetin@gmail.com","cetinyilmaz"),
("Ömer","Kara","Esenler, 34200 Esenler/İstanbul","05456782931","omerkara@hotmail.com","karayildirim"),
("Gülcan","Özdemir","Sultanbeyli, 34920 Sultanbeyli/İstanbul","05543286572","gulcanozdemir@gmail.com","ozdemirgulcan"),
("Cemre","Gökçe","Şişli, 34363 Şişli/İstanbul","05323197645","cemregokce@yahoo.com","gokcec2"),
("Ozan","Tanrıverdi","Ataşehir, 34755 Ataşehir/İstanbul","05422267891","ozantanrıverdi@gmail.com","tanrıverdi123"),
("Dilan","Tosun","Zeytinburnu, 34010 Zeytinburnu/İstanbul","05565478920","dilantosun@yahoo.com","tosundilan"),
("Melis","Bütün","Başakşehir, 34480 Başakşehir/İstanbul","05478126395","melisbutun@gmail.com","butunmelis"),
("Levent","Gökçen","Küçükçekmece, 34303 Küçükçekmece/İstanbul","05321278652","leventgokcen@gmail.com","gokcenlevent"),
("Özge","Balta","Üsküdar, 34662 Üsküdar/İstanbul","05459874123","ozgebalta@gmail.com","baltazge"),
("Sibel","Korkmaz","Bağcılar, 34200 Bağcılar/İstanbul","05328965432","sibelkorkmaz@gmail.com","korkmazsibel"),
("Recep","Özkan","Gaziosmanpaşa, 34240 Gaziosmanpaşa/İstanbul","05437658127","recepözkan@gmail.com","özkan123"),
("Meltem","Küçük","Tuzla, 34940 Tuzla/İstanbul","05465498732","meltemkucuk@gmail.com","kucukmeltem"),
("Burcu","Aslan","Beyoğlu, 34433 Beyoğlu/İstanbul","05547618923","burcuaslan@hotmail.com","aslanburcu"),
("Murat","Büyük","Sarıyer, 34450 Sarıyer/İstanbul","05432176549","muratbuyuk@gmail.com","buyukmurat"),
("Büşra","Ergin","Üsküdar, 34662 Üsküdar/İstanbul","05327685412","busraergin@gmail.com","erginbusr"),
("Uğur","Kaya","Ümraniye, 34760 Ümraniye/İstanbul","05543219857","ugurkaya@gmail.com","kayaugur"),
("Cansu","Çiftçi","Beylikdüzü, 34520 Beylikdüzü/İstanbul","05321987612","cansuciftci@gmail.com","ciftci123"),
("İsmail","Yavuz","Kartal, 34870 Kartal/İstanbul","05438127695","ismailyavuz@gmail.com","yavuzismail"),
("Vildan","İleri","Fatih, 34080 Fatih/İstanbul","05346879103","vildanileri@gmail.com","ileri123");

CREATE TABLE admintable(
	adminId int AUTO_INCREMENT NOT null,
    `name` varchar(30) NOT null,
    surname varchar(30) NOT null,
    phone varchar(11),
    email varchar(50),
    `password` varchar(60) not null,
    PRIMARY KEY (adminId)
);
DELIMITER $$ /* admintable için telefon ve mail en az biri var mı diye trigger kontrolu */
CREATE TRIGGER check_admin
BEFORE INSERT ON admintable
FOR EACH ROW
BEGIN
    IF NEW.phone IS NULL AND NEW.email IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'telefon numarasi veya email girilmelidir';
    END IF;
END$$
DELIMITER ;
INSERT INTO admintable (`name`, surname, phone, email, `password`) 
VALUES 
("Ali", "Turan",  "05323456789", "alituran@gmail.com", "turanali"),
("Büşra", "Karataş",  "05521234567", "busra.karatas@yahoo.com", "karatasbusr"),
("Emre", "Yıldız",  "05433221144", "emreyildiz@hotmail.com", "yildizemre"),
("Esra", "Arslan",  "05364567832", "esraarslan@gmail.com", "arslanesra"),
("Ahmet", "Çalışkan",  "05432109876", "ahmetcaliskan@gmail.com", "caliskanhmet"),
("Gülhan", "Yavuz",  "05543219876", "gulhanyavuz@yahoo.com", "yavuzgulhan"),
("İbrahim", "Çetin",  "05398765432", "ibrahimcetin@hotmail.com", "cetinibrahim"),
("Elif", "Köksal",  "05437659812", "elifkoksal@gmail.com", "koksalelif"),
("Mustafa", "Büyük",  "05327865432", "mustafabuyuk@gmail.com", "buyukmustafa"),
("Beyza", "Özdemir",  "05413456789", "beyzaozdemir@gmail.com", "ozdemirbeyza");
CREATE TABLE sellertable(
	sellerId int AUTO_INCREMENT NOT null,
    `name` varchar(30) NOT null,
    surname varchar(30) NOT null,
    phone varchar(11),
    email varchar(50),
    verified boolean,
    banned boolean,
    `password` varchar(60) not null,
    PRIMARY KEY (sellerId)
);
DELIMITER $$ /* sellertable için telefon ve mail en az biri var mı diye trigger kontrolu */
CREATE TRIGGER check_seller
BEFORE INSERT ON sellertable
FOR EACH ROW
BEGIN
    IF NEW.phone IS NULL AND NEW.email IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'telefon numarasi veya email girilmelidir';
    END IF;
END$$
DELIMITER ;
INSERT INTO sellertable (`name`, surname, phone, email, verified, banned, `password`) 
VALUES 
("Cem", "Balcı", "05321345678", "cembalcı@yahoo.com", TRUE, FALSE, "balcicem"),
("Yasemin", "Güven", "05523456790", "yaseminguven@gmail.com", FALSE, FALSE, "guvenyasemin"),
("Orhan", "Akkoyun", "05438765432", "orhanakkoyun@gmail.com", FALSE, TRUE, "akkoyunorhan"),
("Fatma", "Görmez", "05376543210", "fatmagormez@gmail.com", FALSE, FALSE, "gormezfatma"),
("Ceyda", "Kurtuluş", "05410987654", "ceydakurtulus@gmail.com", TRUE, FALSE, "kurtulusceyda"),
("Savaş", "Öztürk", "05324569871", "savasozturk@gmail.com", FALSE, FALSE, "ozturksavas"),
("Emine", "Tanrıverdi", "05438765421", "eminetanrıverdi@gmail.com", TRUE, FALSE, "tanrıverdiemine"),
("Can", "Duru", "05532345678", "canduru@yahoo.com", FALSE, FALSE, "duru123"),
("Serkan", "Taş", "05465478945", "serkantas@gmail.com", TRUE, FALSE, "tasserkan"),
("Hale", "Uygur", "05325678965", "haleuygur@hotmail.com", FALSE, FALSE, "uyguruhale");

CREATE TABLE categorytable(
	categoryId int AUTO_INCREMENT NOT null,
    `name` varchar(30) NOT null,
    PRIMARY KEY (categoryId)
);
INSERT INTO categorytable (`name`)  
VALUES 
("Elektronik"),      
("Moda"),        
("Yiyecek ve İçecek"),    
("Kitap"),     
("Beyaz Eşya"),   
("Ofis Malzemeleri"),     
("Spor Ekipmanları"),   
("Kırtasiye"),   
("Bebek Ürünleri"),  
("Ev Dekorasyonu"),  
("Aksesuarlar"),     
("Müzik Aletleri"),   
("Küçük Ev Aletleri"),   
("Kozmetik Ürünler"),    
("Ayakkabı");    
CREATE TABLE brandtable(
	brandId int AUTO_INCREMENT NOT null,
    `name` varchar(30) NOT null,
    PRIMARY KEY (brandId)
);
INSERT INTO brandtable (`name`)  
VALUES 
("Apple"),  
("Bosch"),   
("Dyson"),  
("Nike"),   
("Adidas"),  
("Samsung"), 
("Vestel"),  
("LG"),  
("Lenovo"),   
("Airstorr"),  
("Huawei"),  
("Xiaomi"),   
("Coca-Cola"),  
("Pepsi"),  
("Arçelik"),  
("İpekyol"), 
("Canon"), 
("Panasonic"), 
("Mango"), 
("Lacoste"), 
("Pegasus"),  
("Ikea"),   
("Koton"),  
("Oral-B"),  
("Taylor"),  
("Casio"),  
("Rampage"),  
("Golden Rose"),  
("Paperora"), 
("Proforce"), 
("Cosfer"),   
("Lava"),     
("Züber"),    
("Viewsonic"),  
("Pierre Cardin"),  
("Nereze"),   
("Nikadu"),     
("Sony"),     
("Bose"),       
("Black Decker"),    
("Sennheiser"), 
("Sprite"),
("Prima"),
("Uni Baby"),
("MAC"),
("Faber-Castell"),
("Can Yayınları");   

CREATE TABLE producttable(
	productId int AUTO_INCREMENT NOT null,
    `name` varchar(30) NOT null,
    `description` text NOT null,
    category int NOT null,
    brand int NOT null,
    `image` TEXT,
    PRIMARY KEY (productId),
    FOREIGN KEY (brand) REFERENCES brandtable(brandId) ON DELETE CASCADE,
    FOREIGN KEY (category) REFERENCES categorytable(categoryId) ON DELETE CASCADE
);
INSERT INTO producttable (`name`, `description`, category, brand, `image`)
VALUES 
("iPhone 14", "Apple'ın en son akıllı telefonu, gelişmiş özelliklerle.", 1, 1, "https://productimages.hepsiburada.net/s/376/960-1280/110000393677091.jpg"),
("Galaxy S22", "Samsung'un yüksek performanslı amiral gemisi akıllı telefonu.", 1, 6, "https://productimages.hepsiburada.net/s/177/960-1280/110000141556265.jpg"),
("Airpods Pro", "Kablosuz aktif gürültü önleyici kulaklık.", 1, 1, "https://productimages.hepsiburada.net/s/337/424-600/110000031510507.jpg/format:webp"),
("ThinkPad X1", "Yüksek performanslı iş dizüstü bilgisayarı.", 1, 9, "https://productimages.hepsiburada.net/s/556/424-600/110000618242346.jpg/format:webp"),
("OLED TV", "65 inç 4K OLED akıllı TV.", 1, 7, "https://productimages.hepsiburada.net/s/353/424-600/110000362001550.jpg/format:webp"),
("Nike Air Max", "Şık ve rahat koşu ayakkabısı.", 15, 4, "https://productimages.hepsiburada.net/s/777/424-600/110000838617231.jpg/format:webp"),
("Adidas Ultraboost", "Yüksek performanslı koşu ayakkabısı.", 15, 5," https://productimages.hepsiburada.net/s/777/424-600/110000736484719.jpg/format:webp"),
("Oyuncu Faresi", "Ergonomik RGB aydınlatmalı fare.", 1, 27, "https://productimages.hepsiburada.net/s/66/424-600/110000007687999.jpg/format:webp"),
("Elektrikli Su Isıtıcı", "1.7L paslanmaz çelik su ısıtıcı.", 13, 2, "https://productimages.hepsiburada.net/s/8/424-600/8866204909618.jpg/format:webp"),
("Blender", "Yüksek hızlı tezgah üstü blender.", 13, 2," https://productimages.hepsiburada.net/s/397/424-600/110000421900482.jpg/format:webp"),
("Saç Kurutma Makinesi", "Kompakt ve güçlü saç kurutma makinesi.", 13, 3, "https://productimages.hepsiburada.net/s/777/424-600/110000764704665.jpg/format:webp"),
("Ruj", "Uzun süre kalıcı mat ruj.", 14, 28,"https://productimages.hepsiburada.net/s/26/424-600/10164195491890.jpg/format:webp"),
("Defter", "A5 boyutunda çizgili defter.", 8, 29, "https://productimages.hepsiburada.net/s/777/424-600/110000822385176.jpg/format:webp"),
("Tükenmez Kalemler", "10'lu mavi mürekkepli kalem seti.", 8, 29, "https://productimages.hepsiburada.net/s/111/424-600/110000058520443.jpg/format:webp"),
("Kitaplık", "Modern 5 raflı ahşap kitaplık.", 10, 22, "https://productimages.hepsiburada.net/s/70/424-600/110000011138205.jpg/format:webp"),
("Yoga Matı", "Kaymaz, çevre dostu yoga matı.", 7, 30, "https://productimages.hepsiburada.net/s/777/424-600/110000776432767.jpg/format:webp"),
("Koşu Bandı", "Ev kullanımı için motorlu koşu bandı.", 7, 31," https://productimages.hepsiburada.net/s/429/424-600/110000460900438.jpg/format:webp"),
("Akustik Gitar", "6 telli akustik gitar.", 12, 32, "https://productimages.hepsiburada.net/s/171/424-600/110000133763614.jpg/format:webp"),
("Keman", "Yeni başlayanlar için kaliteli ahşap keman.", 12, 32," https://productimages.hepsiburada.net/s/34/424-600/10458215481394.jpg/format:webp"),
("Buzdolabı", "Çift kapılı buzlanma önleyici buzdolabı.", 5, 2," https://productimages.hepsiburada.net/s/315/424-600/110000308964514.jpg/format:webp"),
("Çamaşır Makinesi", "Gelişmiş yıkama özelliklerine sahip çamaşır makinesi.", 5, 2," https://productimages.hepsiburada.net/s/777/424-600/110000671014070.jpg/format:webp"),
("Protein Bar", "Yüksek proteinli atıştırmalık bar.", 3, 33, "https://productimages.hepsiburada.net/s/286/424-600/110000275304677.jpg/format:webp"),
("Kutu Coca Cola", "Serinletici gazlı içecek.", 3, 13," https://productimages.hepsiburada.net/s/48/424-600/10940079734834.jpg/format:webp"),
("Yazıcı", "Kablosuz çok işlevli yazıcı.", 6, 17, "https://productimages.hepsiburada.net/s/412/424-600/110000441140169.jpg/format:webp"),
("Projeksiyon Cihazı", "Taşınabilir 1080p projeksiyon cihazı.", 6, 34," https://productimages.hepsiburada.net/s/777/424-600/110000773249859.jpg/format:webp"),
("Bebek Arabası", "Kompakt ve hafif bebek arabası.", 9, 35," https://productimages.hepsiburada.net/s/413/424-600/110000442912350.jpg/format:webp"),
("Bebek Monitörü", "Dijital sesli ve görüntülü bebek monitörü.", 9, 10, "https://productimages.hepsiburada.net/s/451/424-600/110000486621018.jpg/format:webp"),
("Duvar Saati", "Minimalist tasarımlı duvar saati.", 10, 22, "https://productimages.hepsiburada.net/s/777/424-600/110000773439837.jpg/format:webp"),
("Masa Lambası", "Ayarlanabilir LED masa lambası.", 10, 22, "https://productimages.hepsiburada.net/s/777/424-600/110000722385109.jpg/format:webp"),
("Tişört", "Rahat pamuklu tişört.", 2, 4, "https://productimages.hepsiburada.net/s/39/424-600/10619241267250.jpg/format:webp"),
("Kot Pantolon", "Dar kesim denim pantolon.", 2, 23," https://productimages.hepsiburada.net/s/777/424-600/110000664686141.jpg/format:webp"),
("Küpe", "Şık altın kaplama küpe.", 11, 36, "https://productimages.hepsiburada.net/s/777/424-600/110000650972225.jpg/format:webp"),
("Akıllı Saat", "Fitness takibi için akıllı saat.", 1, 1, "https://productimages.hepsiburada.net/s/777/424-600/110000773544127.jpg/format:webp"),
("Bluetooth Hoparlör", "Taşınabilir kablosuz hoparlör.", 1, 7, "https://productimages.hepsiburada.net/s/98/424-600/110000041433129.jpg/format:webp"),
("Güneş Şapkası", "Geniş kenarlı güneş koruyucu şapka.", 2, 5, "https://productimages.hepsiburada.net/s/353/424-600/110000362037070.jpg/format:webp"),
("Elektrikli Diş Fırçası", "Şarj edilebilir elektrikli diş fırçası.", 13, 24, "https://productimages.hepsiburada.net/s/446/424-600/110000480840636.jpg/format:webp"),
("Dijital Kamera", "Kompakt bir fotoğraf makinesi.", 1, 17," https://productimages.hepsiburada.net/s/777/424-600/110000643901391.jpg/format:webp"),
("Kamp Çadırı", "4 kişilik su geçirmez kamp çadırı.", 7, 37, "https://productimages.hepsiburada.net/s/429/424-600/110000461038501.jpg/format:webp"),
("Dizüstü Soğutucu", "4 fanlı laptop soğutucu.", 1, 17, "https://productimages.hepsiburada.net/s/53/424-600/11162030080050.jpg/format:webp"),
("Akıllı Buzdolabı", "Wi-Fi özellikli çok kapılı buzdolabı.", 5, 7, "https://productimages.hepsiburada.net/s/390/424-600/110000413823457.jpg/format:webp"),
("MacBook Pro", "Apple'ın yüksek performanslı dizüstü bilgisayarı, mükemmel ekran ve işlemci gücüyle.", 1, 1, "https://productimages.hepsiburada.net/s/777/424-600/110000804866453.jpg/format:webp"),
("Xiaomi Mi Band 7", "Xiaomi'nin yeni nesil fitness takip cihazı, kalp atış hızı ve uyku takibi.", 1, 12," https://productimages.hepsiburada.net/s/777/424-600/110000658342950.jpg/format:webp"),
("Samsung Galaxy Buds Pro", "Kablosuz aktif gürültü engelleme özelliğine sahip kulaklık.", 1, 6," https://productimages.hepsiburada.net/s/406/424-600/110000434110500.jpg/format:webp"),
("LG OLED Monitor", "4K çözünürlükte büyük OLED ekran monitör.", 1, 8," https://productimages.hepsiburada.net/s/777/424-600/110000751743541.jpg/format:webp"),
("Lenovo Ideapad 3", "Şık ve hafif tasarıma sahip Lenovo dizüstü bilgisayar.", 1, 9, "https://productimages.hepsiburada.net/s/777/424-600/110000845872759.jpg/format:webp"),
("Sony PlayStation 5", "Sony'nin yeni nesil oyun konsolu, ultra hızlı SSD ile oyun deneyimi.", 1, 38, "https://productimages.hepsiburada.net/s/530/424-600/110000587446794.jpg/format:webp"),
("Nike ZoomX Vaporfly", "Nike'ın en hızlı koşu ayakkabısı, maraton koşuları için ideal.", 15, 4," https://productimages.hepsiburada.net/s/54/424-600/11166243618866.jpg/format:webp"),
("Adidas Predator Soccer Shoes", "Futbol için tasarlanmış, mükemmel tutuşa sahip ayakkabı.", 15, 5, "https://productimages.hepsiburada.net/s/777/424-600/110000799861366.jpg/format:webp"),
("Bose QuietComfort 45", "Bose'un üstün ses yalıtımına sahip kulaklıkları.", 1, 39," https://productimages.hepsiburada.net/s/381/424-600/110000400484733.jpg/format:webp"),
("Black+Decker Elektrikli Matkap", "Hafif ve taşınabilir elektrikli matkap.", 13, 40, "https://productimages.hepsiburada.net/s/777/424-600/110000775309140.jpg/format:webp"),
("Canon EOS 90D", "Canon'un yüksek çözünürlüklü DSLR fotoğraf makinesi.", 1, 17,"https://productimages.hepsiburada.net/s/35/424-600/10477335052338.jpg/format:webp"),
("Panasonic Lumix GX9", "Kompakt ve taşınabilir, kaliteli fotoğraf çekimi yapan dijital kamera.", 1, 18, "https://productimages.hepsiburada.net/s/777/424-600/110000695548165.jpg/format:webp"),
("Şişe Coca-Cola", "Yaz için serinletici gazlı içecek, 1.5 litre.", 3, 13, "https://productimages.hepsiburada.net/s/33/424-600/10417878138930.jpg/format:webp"),
("Kutu Pepsi", "Pepsi'nin klasik, tatlı gazlı içeceği.", 3, 14,"https://productimages.hepsiburada.net/s/157/424-600/110000113834188.jpg/format:webp"),
("Kahve Makinesi", "Çiftli telve, türk kahvesi makinesi.", 13, 15," https://productimages.hepsiburada.net/s/449/424-600/110000484505567.jpg/format:webp"),
("Elbise", "Siyah şık mini elbise.", 2, 16, "https://productimages.hepsiburada.net/s/525/424-600/110000582146377.jpg/format:webp"),
("Bot", "Koyu camel topuklu deri bilek botu.", 2, 19, "https://productimages.hepsiburada.net/s/544/424-600/110000604834078.jpg/format:webp"),
("Çanta", "İşlemeli siyah şık çanta.", 2, 19, "https://productimages.hepsiburada.net/s/777/424-600/110000789324071.jpg/format:webp"),
("Mini Buzdolabı", "Retro SB14001 Pembe Mini Buzdolabı.", 5, 7," https://productimages.hepsiburada.net/s/548/424-600/110000609500491.jpg/format:webp"),
("Fitbit Charge 5", "Fitness ve sağlık takibi için gelişmiş özelliklere sahip akıllı bileklik.", 1, 12," https://productimages.hepsiburada.net/s/777/424-600/110000817692942.jpg/format:webp"),
("Sennheiser Momentum Wireless", "Sennheiser'ın üstün ses performansı sunan kablosuz kulaklıkları.", 1, 41, "https://productimages.hepsiburada.net/s/238/424-600/110000221276200.jpg/format:webp"),
("Etek", "Püsküllü tüvit etek.", 2, 16, "https://productimages.hepsiburada.net/s/777/424-600/110000800632993.jpg/format:webp"),
("Parfüm", "İpekyol Velvet Rose Edp 100 ml Parfüm.", 14, 16, "https://productimages.hepsiburada.net/s/777/424-600/110000813276343.jpg/format:webp"),
("Diş Macunu", "Beyazlatıcı özellikli diş macunu.", 14, 24, "https://productimages.hepsiburada.net/s/777/424-600/110000760913429.jpg/format:webp"),
("Pilli Diş Fırçası", "Oral-B Çocuklar için Prenses Temalı Pilli Diş Fırçası.", 13, 24, "https://productimages.hepsiburada.net/s/518/424-600/110000574031389.jpg/format:webp"),
("Lenovo 1TB Hard Drive", "Veri depolama için taşınabilir 1TB USB 3.0 harici hard disk.", 1, 9, "https://productimages.hepsiburada.net/s/777/424-600/110000841951270.jpg/format:webp"),
("Kaban", "Rüzgar Geçirmez Uzun Kaşe Kaban Oversize Geniş Kalıp Kruvaze Yaka Düğmeli .", 1, 19, "https://productimages.hepsiburada.net/s/777/424-600/110000764715784.jpg/format:webp"),
("Samsung Galaxy Tab S8", "Samsung'un yüksek performanslı ve taşınabilir tablet modeli.", 1, 6, "https://productimages.hepsiburada.net/s/178/424-600/110000142713244.jpg/format:webp"),  
("Kutu Sprite", "Serinletici ve ferahlatıcı gazlı içecek.", 3, 42, "https://productimages.hepsiburada.net/s/186/424-600/110000152016688.jpg/format:webp"),  
("LG Televizyon", "Yüksek çözünürlüklü, kaliteli görüntü sağlayan akıllı televizyon.", 1, 8, "https://productimages.hepsiburada.net/s/777/424-600/110000700424562.jpg/format:webp"),  
("Samsung A30", "Samsung'un bütçe dostu, uzun batarya ömürlü akıllı telefonu.", 1, 6, "https://productimages.hepsiburada.net/s/777/424-600/110000649786546.jpg/format:webp"),  
("Maskara", "Hacim veren ve uzun süre kalıcı maskara.", 14, 28, "https://productimages.hepsiburada.net/s/309/424-600/110000302219642.jpg/format:webp"),  
("Fondoten", "Golden Rose Up To 24 Hours Stay Foundation No: 11 - 24 Saate Kadar Kalıcı Fondöten.", 14, 28, "https://productimages.hepsiburada.net/s/777/424-600/110000807900027.jpg/format:webp"),  
("Mucize", "Bestseller Kitap", 4, 21, "https://productimages.hepsiburada.net/s/3/424-600/9599305515058.jpg/format:webp"),
("Trendeki Kız", "Bestseller Kitap", 4, 21, "https://productimages.hepsiburada.net/s/5/424-600/9673603022898.jpg/format:webp"),
("Billy Kitaplık", "Modüler tasarımıyla geniş depolama alanı sunan kitaplık.", 10, 22, "https://productimages.hepsiburada.net/s/538/424-600/110000598037543.jpg/format:webp"),
("Malm Komodin", "Modern ve zarif tasarıma sahip, yatak odası için komodin.", 10, 22, "https://productimages.hepsiburada.net/s/777/424-600/110000676835978.jpg/format:webp"),
("LACK Sehpa", "Minimalist tasarımıyla her mekana uyum sağlayan sehpa.", 10, 22, "https://productimages.hepsiburada.net/s/528/424-600/110000585183384.jpg/format:webp"),
("Hemnes Çekyat", "Geniş oturma alanı ve modern tasarımıyla şık bir çekyat.", 10, 22, "https://productimages.hepsiburada.net/s/177/424-600/110000141762684.jpg/format:webp"),
("Kallax Raf Sistemi", "Çok fonksiyonlu, modüler raf ünitesi.", 10, 22, "https://productimages.hepsiburada.net/s/182/424-600/110000146575719.jpg/format:webp"),
("Ektorp Kanepe", "Yüksek konfor sağlayan klasik tarzda bir kanepe.", 10, 22, "https://productimages.hepsiburada.net/s/777/424-600/110000764634635.jpg/format:webp"),
("RANARP Masa Lambası", "Endüstriyel tasarıma sahip ayarlanabilir masa lambası.", 10, 22, "https://productimages.hepsiburada.net/s/777/424-600/110000843991808.jpg/format:webp"),
("Kadın Bluz", "Yumuşak dokusu ve şık tasarımıyla rahat bluz.", 2, 23, "https://productimages.hepsiburada.net/s/777/424-600/110000811861613.jpg/format:webp"),
("Erkek T-shirt", "Hafif ve rahat kesimiyle günlük kullanım için ideal tişört.", 2, 23, "https://productimages.hepsiburada.net/s/336/424-600/110000342271130.jpg/format:webp"),
("Erkek Jean Pantolon", "Modern ve şık kesimiyle erkekler için kot pantolon.", 2, 23, "https://productimages.hepsiburada.net/s/777/424-600/110000740028510.jpg/format:webp"),
("Kadın Elbise", "Zarif tasarımıyla günlük ve özel günlerde giyilebilen elbise.", 2, 23, "https://productimages.hepsiburada.net/s/560/424-600/110000623241785.jpg/format:webp"),
("Sırt Çantası", "Koton Spor Çanta Slogan Baskılı.", 2, 23, "https://productimages.hepsiburada.net/s/294/424-600/110000283599225.jpg/format:webp"),
("Kadın Ayakkabısı", "Rahat ve şık tasarıma sahip, günlük kullanım için ideal ayakkabı.", 15, 23, "https://productimages.hepsiburada.net/s/456/424-600/110000491496455.jpg/format:webp"),
("Erkek Ceket", "Şık kesimi ve kaliteli kumaşıyla erkekler için ceket.", 2, 23, "https://productimages.hepsiburada.net/s/777/424-600/110000749926080.jpg/format:webp"),
("Kadın Etek", "Modern kesimiyle şık bir kadın eteği.", 2, 23, "https://productimages.hepsiburada.net/s/777/424-600/110000758598355.jpg/format:webp"),
("Taylor 214ce Akustik Gitar", "Fiyat-performans oranı yüksek, başlangıç seviyesindeki gitar severler için ideal model.", 12, 25, "https://productimages.hepsiburada.net/s/31/424-600/10348286246962.jpg/format:webp"),
("Taylor GS Mini Akustik Gitar", "Kompakt boyutlarıyla taşıması kolay, kaliteli ses veren gitar.", 12, 25, "https://productimages.hepsiburada.net/s/777/424-600/110000834394617.jpg/format:webp"),
("Taylor 712ce Akustik Gitar", "Yüksek kaliteli işçilik ve zengin ton aralığı sunan profesyonel akustik gitar.", "12, 25, https://productimages.hepsiburada.net/s/291/424-600/110000278973746.jpg/format:webp"),
("Casio Privia PX-160 Dijital Piyano", "Casio'nun en popüler dijital piyanolarından biri olan PX-160, gerçek piyano sesi ve tuş hissiyatı sunar.", 12, 26, "https://productimages.hepsiburada.net/s/496/424-600/110000546929569.jpg/format:webp"),
("Casio CT-S300 Keyboard", "Taşınabilir ve kompakt yapısı ile giriş seviyesi müzikçilere yönelik eğlenceli ve pratik bir klavye.", 12, 26, "https://productimages.hepsiburada.net/s/42/424-600/10742177988658.jpg/format:webp"),
("Parfüm", "Lacoste L.12.12 Rose Sparkling 100ML Kadın Parfüm.", 14, 20, "https://productimages.hepsiburada.net/s/777/424-600/110000667928441.jpg/format:webp"),
("Huawei Matepad", "Huawei Matepad 11.5 8GB 128GB 11.5 Tablet.", 1, 11, "https://productimages.hepsiburada.net/s/430/424-600/110000461971707.jpg/format:webp"),
("Prima Aktif Bebek Bezi", "Prima'nın hassas ciltler için özel olarak tasarlanmış, uzun süre kuruluk sağlayan bebek bezi.", 9, 42, "https://productimages.hepsiburada.net/s/518/960-1280/110000574597835.jpg"),
("Uni Baby Yenidoğan Islak Mendil", "Yenidoğan bebekler için özel formüle edilmiş, parfümsüz ıslak mendil.", 9, 43, "https://productimages.hepsiburada.net/s/777/424-600/110000776541916.jpg/format:webp"),
("Uni Baby Bebek Şampuanı", "Hassas bebek cildine uygun, göz yakmayan formüllü bebek şampuanı.", 9, 43, "https://productimages.hepsiburada.net/s/777/424-600/110000740598014.jpg/format:webp"),
("Uni Baby Pişik Kremi", "Bebeklerin hassas cildini koruyan ve rahatlatan pişik kremi.", 9, 43, "https://productimages.hepsiburada.net/s/78/424-600/110000020334265.jpg/format:webp"),
("Uni Baby Vazalin", "Bebek cildine nem kazandıran ve yatıştıran vazalin.", 9, 43, "https://productimages.hepsiburada.net/s/526/424-600/110000584025956.jpg/format:webp"),
("Uni Baby Çamaşır Deterjanı", "Bebek giysileri için özel olarak geliştirilmiş, hipoalerjenik çamaşır deterjanı.", 9, 43, "https://productimages.hepsiburada.net/s/75/424-600/110000016459187.jpg/format:webp"),
("MAC Ruby Woo Ruj", "İkonik kırmızı ruj, uzun süre kalıcı mat bitiş sunar.", 14, 44, "https://productimages.hepsiburada.net/s/777/424-600/110000674874755.jpg/format:webp"),
("MAC Studio Fix Fondöten", "Cilt tonunu eşitleyen, orta ve tam kapatıcılık sağlayan fondöten.", 14, 44, "https://productimages.hepsiburada.net/s/777/424-600/110000683344402.jpg/format:webp"),
("MAC Mineralize Skinfinish Aydınlatıcı", "Cilde doğal bir parlaklık veren ince dokulu aydınlatıcı.", 14, 44, "https://productimages.hepsiburada.net/s/777/424-600/110000672651457.jpg/format:webp"),
("MAC Prep + Prime Makyaj Bazı", "Cildi makyaja hazırlayan, nemlendiren ve makyajı uzun süre koruyan makyaj bazı.", 14, 44, "https://productimages.hepsiburada.net/s/777/424-600/110000683344705.jpg/format:webp"),
("MAC Blacktrack Gel Eyeliner", "Yoğun siyah, suya dayanıklı jel eyeliner.", 14, 44, "https://productimages.hepsiburada.net/s/777/222-222/110000683342307.jpg/format:webp"),
("MAC False Lashes Maskara", "Yoğun hacim ve uzunluk sağlayan siyah maskara.", 14, 44, "https://productimages.hepsiburada.net/s/777/222-222/110000681913663.jpg/format:webp"),
("Züber Fındık Kreması", "Yüksek proteinli ve çikolatalı lezzetli krema.", 3, 34, "https://productimages.hepsiburada.net/s/777/222-222/110000792813212.jpg/format:webp"),
("Züber Hindistan Cevizli Meyve Barı", "Hindistan cevizi ile zenginleştirilmiş doğal meyve barı.", 3, 34, "https://cdn.dsmcdn.com/ty1509/product/media/images/prod/QC/20240829/09/6083e53d-00fc-3946-b690-b27a91acf627/1_org_zoom.jpg"),
("Faber-Castell Grip 2001 Kurşun Kalem", "Ergonomik tasarımı ve yüksek kaliteli grafit ucu ile yazım rahatlığı sunar.", 8, 50, "https://productimages.hepsiburada.net/s/22/300-400/9972898955314.jpg/format:webp"),
("Faber-Castell Su Bazlı Keçeli Kalem Seti", "12 canlı renkten oluşan, su bazlı ve kolay temizlenebilir keçeli kalem seti.", 8, 50, "https://productimages.hepsiburada.net/s/777/222-222/110000840930840.jpg/format:webp"),
("Faber-Castell Kuru Boya Kalemleri 24'lü", "Yumuşak dokulu, kolay açılan ve parlak renklere sahip kuru boya seti.", 8, 50, "https://productimages.hepsiburada.net/s/514/222-222/110000569845560.jpg/format:webp"),
("Faber-Castell Silinebilir Tükenmez Kalem", "Silinebilir mürekkebiyle pratik ve temiz yazma imkanı sunar.", 8, 50, "https://productimages.hepsiburada.net/s/509/300-400/110000563465458.jpg/format:webp"),
("Faber-Castell A3 Teknik Çizim Defteri", "Yüksek kaliteli, asitsiz kağıt içeren teknik çizim için ideal defter.", 8, 50, "https://m.media-amazon.com/images/I/51MMYW23KJL._AC_UL480_FMwebp_QL65_.jpg"),
("Flüt", "Yüksek kaliteli flüt, profesyonel kullanım için ideal.", 12, 35, "https://productimages.hepsiburada.net/s/73/222-222/110000015117247.jpg/format:webp"),
("Ukulele", "Küçük boyutlu ve taşınabilir ukulele, yeni başlayanlar için mükemmel.", 12, 35, "https://productimages.hepsiburada.net/s/777/222-222/110000783459056.jpg/format:webp"),
("Saz", "Türk müziği için uygun, geleneksel saz.", 12, 35, "https://productimages.hepsiburada.net/s/777/222-222/110000760504223.jpg/format:webp"),
("Davul", "Profesyonel davul seti, müzik öğrencileri ve grup performansları için.", 12, 35, "https://productimages.hepsiburada.net/s/152/222-222/110000107930486.jpg/format:webp"),
("Gitar", "Akustik gitar, kaliteli ses ve uzun ömürlü yapı.", 12, 35, "https://productimages.hepsiburada.net/s/18/222-222/9803475812402.jpg/format:webp"),
("Piyano", "Tam boyutlu dijital piyano, ev kullanımı için ideal.", 12, 35, "https://productimages.hepsiburada.net/s/777/222-222/110000687399939.jpg/format:webp"),
("Keman", "Yüksek kaliteli keman, müzik okulunda kullanılabilecek ideal enstrüman.", 12, 35, "https://productimages.hepsiburada.net/s/8/222-222/9038131822642.jpg/format:webp"),
("Saksafon", "Profesyonel saksafon, zengin ve derin sesler için.", 12, 35, "https://productimages.hepsiburada.net/s/777/222-222/110000785372500.jpg/format:webp"),
("Trompet", "Trompet, orkestra ve solo performanslar için mükemmel.", 12, 35, "https://productimages.hepsiburada.net/s/431/222-222/110000462831049.jpg/format:webp"),
("Marakas", "Renkli marakas, çeyrek sesler ve ritmik vuruşlar için.", 12, 35, "https://productimages.hepsiburada.net/s/777/222-222/110000693979006.jpg/format:webp"),
("Sıçrama İpi", "Hafif ve taşınabilir sıçrama ipi, kardiyo antrenmanları için ideal.", 7, 38, "https://productimages.hepsiburada.net/s/200/424-600/110000169462167.jpg/format:webp"),
("Fitness Topu", "Dayanıklı ve kaymaz fitness topu, egzersizler için mükemmel.", 7, 38, "https://productimages.hepsiburada.net/s/406/222-222/110000434009058.jpg/format:webp"),
("Eliptik Bisiklet", "Düşük etkili kardiyo egzersizleri için eliptik bisiklet.", 7, 38, "https://productimages.hepsiburada.net/s/777/222-222/110000644890157.jpg/format:webp"),
("Basketbol Topu", "Profesyonel kalite basketbol topu, iç ve dış mekanlarda kullanılabilir.", 7, 38, "https://productimages.hepsiburada.net/s/555/222-222/110000617753576.jpg/format:webp"),
("Halter Seti", "Başlangıç ve ileri seviye halter antrenmanları için tam set.", 7, 38, "https://productimages.hepsiburada.net/s/87/222-222/110000030099003.jpg/format:webp"),
("Voleybol Topu", "Yüksek kaliteli voleybol topu, plaj ve salon voleybolu için uygun.", 7, 38, "https://productimages.hepsiburada.net/s/96/222-222/110000038800577.jpg/format:webp"),
("Futbol Topu", "Uluslararası standartlarda futbol topu, dayanıklı ve mükemmel performans.", 7, 38, "shttps://productimages.hepsiburada.net/s/509/222-222/110000564090128.jpg/format:webp"),
("LG Akıllı Telefon", "LG'nin son teknoloji akıllı telefonu, hızlı işlemci ve yüksek çözünürlük kamera.", 1, 8, "https://productimages.hepsiburada.net/s/777/222-222/110000721913376.jpg/format:webp"),
("Xiaomi Mi 11", "Xiaomi'nin amiral gemisi telefonu, güçlü işlemci ve 108 MP kamera.", 1, 12, "https://productimages.hepsiburada.net/s/204/222-222/110000178166761.jpg/format:webp"),
("Xiaomi Mi Air Purifier", "Xiaomi'nin hava temizleyici cihazı, odada hava kalitesini iyileştirir.", 13, 12, "https://productimages.hepsiburada.net/s/393/222-222/110000417161165.jpg/format:webp"),
("LG Bluetooth Kulaklık", "LG'nin ergonomik ve rahat Bluetooth kulaklıkları, uzun pil ömrü ile.", 1, 8, "https://productimages.hepsiburada.net/s/310/222-222/110000303185179.jpg/format:webp"),
("Xiaomi Robot Süpürge", "Xiaomi'nin akıllı robot süpürgesi, otomatik olarak evi temizler ve harita çıkarır.", 13, 12, "https://productimages.hepsiburada.net/s/185/222-222/110000150950980.jpg/format:webp"),
("Xiaomi Mi Band 6", "Xiaomi'nin akıllı bilekliği, adım sayma, kalori takibi ve uyku analizi.", 1, 12, "https://productimages.hepsiburada.net/s/90/222-222/110000032614040.jpg/format:webp"),
("1984", "George Orwell'in distopik romanı, totaliter bir rejimin korkutucu etkilerini anlatıyor.", 4, 40, "https://productimages.hepsiburada.net/s/37/222-222/10535266484274.jpg/format:webp"),
("Sefiller", "Victor Hugo'nun ünlü eseri, Fransız devrimi sonrası toplumun çalkantılarını anlatır.", 4, 40, "https://productimages.hepsiburada.net/s/35/222-222/10459452375090.jpg/format:webp"),
("Suç ve Ceza", "Fyodor Dostoyevski'nin, insan ruhunun derinliklerine inen büyük eseri.", 4, 40, "https://productimages.hepsiburada.net/s/23/222-222/10008002002994.jpg/format:webp"),
("Yüzyıllık Yalnızlık", "Gabriel García Márquez'in büyülü gerçekçilikle yazılmış başyapıtı.", 4, 40, "https://productimages.hepsiburada.net/s/777/222-222/110000815065258.jpg/format:webp"),
("Don Kişot", "Miguel de Cervantes'in başyapıtı, bir şövalyenin ve sadık hizmetkarının serüvenlerini konu alır.", 4, 40, "https://www.canyayinlari.com/productimages/116761/big/9789750705090_front_cover.jpg"),
("Gurur ve Önyargı", "Jane Austen'in, sınıf farklılıkları ve aşk üzerine yazdığı klasik romanı.", 4, 40, "https://www.canyayinlari.com/productimages/121684/middle/9789750761799_front_cover.jpg"),
("Anna Karenina", "Lev Tolstoy'un, aşk, sadakat ve toplumsal normlar üzerine yazdığı büyük romanı.", 4, 40, "https://www.canyayinlari.com/productimages/119447/middle/9789750739651_front_cover.jpg"),
("Büyük Umutlar", "Charles Dickens'ın, yoksulluktan zenginliğe geçişin ve hayal kırıklıklarının romanı.", 4, 40, "https://productimages.hepsiburada.net/s/23/222-222/10008195006514.jpg/format:webp"),
("Moby Dick", "Herman Melville'in, okyanuslarda geçen, bir balina avcısının hikayesini anlatan epik romanı.", 4, 40, "https://productimages.hepsiburada.net/s/37/222-222/10535299088434.jpg/format:webp"),
("Küçük Prens", "Antoine de Saint-Exupéry'nin, evrensel sevgiyi ve insan ilişkilerini anlatan masalsı eseri.", 4, 40, "https://www.canyayinlari.com/productimages/118452/middle/9789750724435_front_cover.jpg"),
("Savaş ve Barış", "Lev Tolstoy'un, Napolyon'un Rusya'ya saldırısını ve bunun toplum üzerindeki etkilerini anlattığı dev romanı.", 4, 40, "https://www.canyayinlari.com/productimages/119436/middle/9789750739545_front_cover.jpg"),
("Mango Çanta", "Mango'nun stil sahibi çantaları, her görünümü tamamlayan mükemmel aksesuar.", 2, 19, "https://productimages.hepsiburada.net/s/777/300-400/110000841876916.jpg/format:webp"),
("Mango Şapka", "Mango'nun şık şapkaları, yaz ve kış aylarında stilinizi tamamlar.", 2, 19, "https://productimages.hepsiburada.net/s/507/300-400/110000561919254.jpg/format:webp"),
("Mango Etek", "Mango'nun zarif etekleri, her ortamda şıklığı yakalamanıza yardımcı olur.", 2, 19, "https://productimages.hepsiburada.net/s/777/300-400/110000679920141.jpg/format:webp"),
("Mango Parfüm", "Mango'nun kadın ve erkek parfümleri, tarzınıza uygun özel kokular sunar.", 2, 19, "https://productimages.hepsiburada.net/s/777/222-222/110000667388418.jpg/format:webp"),
("Mango Cüzdan", "Mango'nun şık cüzdanları, hem işlevsel hem de şık bir aksesuar arayanlar için ideal.", 2, 19, "https://productimages.hepsiburada.net/s/777/300-400/110000841867631.jpg/format:webp"),
("Mango Şort", "Mango'nun rahat ve şık şortları, yaz aylarında mükemmel bir seçim.", 2, 19, "https://productimages.hepsiburada.net/s/777/300-400/110000679937452.jpg/format:webp");

CREATE TABLE seller_producttable(
	seller_productId int AUTO_INCREMENT NOT null,
    sellerId int NOT null,
    productId int NOT null,
    stock int not null,
    price decimal(10,2) NOT null,
    PRIMARY KEY (seller_productId),
    FOREIGN KEY (sellerId) REFERENCES sellertable(sellerId),
    FOREIGN KEY (productId) REFERENCES producttable(productId)
);
INSERT INTO seller_producttable (sellerId, productId, stock, price)
VALUES 
(1, 1, 25, 9999.99),
(1, 2, 22, 8499.50),
(1, 3, 28, 2499.00),
(1, 4, 24, 17999.95),
(1, 5, 27, 22999.99),
(2, 6, 29, 999.50),
(2, 7, 23, 1200.00),
(2, 8, 26, 199.99),
(2, 9, 21, 149.99),
(2, 10, 30, 549.95),
(3, 11, 25, 199.99),
(3, 12, 29, 59.95),
(3, 13, 24, 15.00),
(3, 14, 22, 7.50),
(3, 15, 27, 899.99),
(4, 16, 28, 150.00),
(4, 17, 26, 699.99),
(4, 18, 23, 1500.00),
(4, 19, 30, 999.95),
(4, 20, 25, 4599.99),
(5, 21, 27, 99.95),
(5, 22, 24, 1.50),
(5, 23, 29, 4999.95),
(5, 24, 22, 2499.99),
(5, 25, 30, 7499.99),
(6, 26, 28, 199.99),
(6, 27, 26, 799.99),
(6, 28, 23, 189.95),
(6, 29, 30, 249.99),
(6, 30, 25, 499.95),
(7, 31, 27, 99.99),
(7, 32, 24, 39.99),
(7, 33, 30, 299.99),
(7, 34, 22, 149.50),
(7, 35, 26, 59.95),
(8, 36, 23, 49.95),
(8, 37, 28, 199.99),
(8, 38, 30, 999.95),
(8, 39, 25, 749.50),
(8, 40, 27, 4999.99),
(9, 1, 21, 10499.99),
(9, 2, 29, 8999.50),
(9, 3, 22, 2599.00),
(9, 4, 28, 18000.00),
(9, 5, 30, 23999.99),
(10, 6, 23, 899.95),
(10, 7, 25, 1300.00),
(10, 8, 29, 250.00),
(10, 9, 24, 159.99),
(10, 10, 22, 599.95);
CREATE TABLE ordertable(
	orderId int AUTO_INCREMENT NOT null,
    customerId int NOT null,
    orderdate DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (orderId),
    FOREIGN KEY (customerId) REFERENCES customertable(customerId)
);
INSERT INTO ordertable (customerId, orderdate) VALUES 
(1, '2024-11-01 10:30:00'), 
(2, DEFAULT),             
(3, '2024-11-02 15:00:00'), 
(4, DEFAULT),              
(5, '2024-10-30 08:45:00'),
(6, '2024-11-05 12:20:00'), 
(7, DEFAULT),              
(8, '2024-11-10 14:10:00'),
(9, '2024-10-28 09:00:00'), 
(10, DEFAULT),           
(11, '2024-11-12 11:50:00'),
(12, DEFAULT),            
(13, '2024-11-04 16:30:00'), 
(14, DEFAULT),            
(15, '2025-01-06 07:15:00'),
(1, '2024-11-03 18:00:00'), 
(3, '2025-01-05 09:45:00'), 
(5, '2025-01-07 13:10:00'), 
(8, '2025-01-08 17:25:00'); 
CREATE TABLE orderitemtable(
	orderitemId int AUTO_INCREMENT NOT null,
    orderId int NOT null,
    seller_productId int NOT null,
    amount int not null,
    PRIMARY KEY (orderitemId),
    FOREIGN KEY (orderId) REFERENCES ordertable(orderId),
    FOREIGN KEY (seller_productId) REFERENCES seller_producttable(seller_productId)
);
DELIMITER $$ /* stok order için yeterli mi */
CREATE TRIGGER before_orderitem_insert
BEFORE INSERT ON orderitemtable
FOR EACH ROW
BEGIN
    DECLARE available_stock INT;
    SELECT stock INTO available_stock
    FROM seller_producttable
    WHERE seller_productId = NEW.seller_productId;
    IF available_stock < NEW.amount THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Yeterince stok yok.';
    END IF;
END$$
DELIMITER ;
DELIMITER $$ /* stok miktarını azaltıyor alınınca */
CREATE TRIGGER after_orderitem_insert
AFTER INSERT ON orderitemtable
FOR EACH ROW
BEGIN
    UPDATE seller_producttable
    SET stock = stock - NEW.amount
    WHERE seller_productId = NEW.seller_productId;
END$$
DELIMITER ;
INSERT INTO orderitemtable (orderId, seller_productId, amount)
VALUES
(1, 1, 2), 
(1, 2, 1), 
(1, 3, 3),
(2, 4, 4), 
(2, 5, 2),
(3, 6, 1), 
(3, 7, 2), 
(3, 8, 5),
(4, 9, 1),
(5, 10, 3), 
(5, 11, 4), 
(5, 12, 2),
(6, 13, 5), 
(6, 14, 1),
(7, 15, 2), 
(7, 16, 4), 
(7, 17, 3),
(8, 18, 5), 
(8, 19, 1),
(9, 20, 3), 
(9, 21, 2), 
(9, 22, 1),
(10, 23, 4),
(11, 24, 5), 
(11, 25, 3),
(12, 26, 2),
(13, 27, 1), 
(13, 28, 4),
(14, 29, 3),
(15, 30, 2), 
(15, 31, 1), 
(15, 32, 5),
(16, 33, 4), 
(16, 34, 3),
(17, 35, 5), 
(17, 36, 2), 
(17, 37, 1),
(18, 38, 4), 
(18, 39, 3),
(19, 40, 2), 
(19, 1, 1), 
(19, 2, 5);
CREATE TABLE methodtable(
    methodtype varchar(30) NOT null UNIQUE,
    PRIMARY KEY (methodtype)
);
INSERT INTO methodtable (methodtype)  
VALUES 
("Credit Card"),
("Debit Card"),
("PayPal"),
("Bitpay"),
("Cash on Delivery"),
("Apple Pay"),
("Google Pay"),
("Bitcoin"),
("Stripe"),
("AmazonPay");
CREATE TABLE paymenttable(
	paymentId int AUTO_INCREMENT NOT null,
    orderId int NOT null,
    methodtype varchar(30) NOT null,
    customerId int DEFAULT null,
    paymentamount decimal(10,2) DEFAULT 0.00,
    PRIMARY KEY (paymentId),
    FOREIGN KEY (methodtype) REFERENCES methodtable(methodtype),
    FOREIGN KEY (orderId) REFERENCES ordertable(orderId)
);
DELIMITER $$ /* paymentamountu otomatik hesaplamak için trigger */
CREATE TRIGGER before_payment_amount
BEFORE INSERT ON paymenttable
FOR EACH ROW
BEGIN
    SET NEW.paymentamount = (
        SELECT SUM(sp.price * oi.amount)
        FROM orderitemtable AS oi
        JOIN seller_producttable AS sp ON oi.seller_productId = sp.seller_productId
        WHERE oi.orderId = NEW.orderId
    );
END$$
DELIMITER ; 
DELIMITER $$ /* customerId auto alma için trigger */
CREATE TRIGGER before_payment_customerId
BEFORE INSERT ON paymenttable
FOR EACH ROW
BEGIN
    SET NEW.customerId = (
        SELECT customerId
        FROM ordertable AS o
        WHERE o.orderId = NEW.orderId
    );
END$$
DELIMITER ;
INSERT INTO paymenttable (orderId, methodtype)
VALUES
(1, "Credit Card"),
(2, "PayPal"),
(3, "Debit Card"),
(4, "Bitpay"),
(5, "Cash on Delivery"),
(6, "Apple Pay"),
(7, "Google Pay"),
(8, "Bitcoin"),
(9, "Stripe"),
(10, "AmazonPay"),
(11, "Credit Card"),
(12, "PayPal"),
(13, "Debit Card"),
(14, "Bitpay"),
(15, "Cash on Delivery"),
(16, "Apple Pay"),
(17, "Google Pay"),
(18, "Bitcoin"),
(19, "Stripe");
CREATE TABLE admin_categorytable(
	admin_categoryId int AUTO_INCREMENT NOT null,
    adminId int NOT null,
    category int NOT null,
    PRIMARY KEY (admin_categoryId),
    FOREIGN KEY (adminId) REFERENCES admintable(adminId),
    FOREIGN KEY (category) REFERENCES categorytable(categoryId)
); /* her admin belli category'lerdeki itemları managelayacak */
INSERT INTO admin_categorytable (adminId, category)
VALUES
(1, 1), (1, 2), (1, 3), (1, 4), 
(2, 5), (2, 6), (2, 7), (2, 8), 
(3, 9), (3, 10), (3, 11), (3, 12), 
(4, 13), (4, 14), (4, 15), (4, 1), 
(5, 2), (5, 3), (5, 4), (5, 5), 
(6, 6), (6, 7), (6, 8), (6, 9), 
(7, 10), (7, 11), (7, 12), (7, 13), 
(8, 14), (8, 15), (8, 1), (8, 2),
(9, 3), (9, 4), (9, 5), (9, 6), 
(10, 7), (10, 8), (10, 9), (10, 10);
