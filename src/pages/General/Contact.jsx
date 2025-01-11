import React from 'react';

const Contact = () => {
	return (
		<div className='contact-container'>
			<div className='contact-header'>
				<h1>Bizimle İletişime Geçin</h1>
				<p>
					Herhangi bir sorunuz veya öneriniz varsa aşağıdaki bilgilerden bize
					ulaşabilirsiniz.
				</p>
			</div>
			<div className='contact-info'>
				<div className='info-section'>
					<h2>Email</h2>
					<p>iletisim@trendify.com</p>
				</div>
				<div className='info-section'>
					<h2>Telefon</h2>
					<p>+90 (212) 555-1234</p>
				</div>
				<div className='info-section'>
					<h2>Adres</h2>
					<p>Trendify Cad., No: 34, Şişli, İstanbul, Türkiye</p>
				</div>
				<div className='info-section'>
					<h2>Sosyal Medya</h2>
					<p>
						<a
							href='https://instagram.com/trendify'
							target='_blank'
							rel='noopener noreferrer'
						>
							Instagram
						</a>{' '}
						|{' '}
						<a
							href='https://twitter.com/trendify'
							target='_blank'
							rel='noopener noreferrer'
						>
							Twitter
						</a>{' '}
						|{' '}
						<a
							href='https://facebook.com/trendify'
							target='_blank'
							rel='noopener noreferrer'
						>
							Facebook
						</a>
					</p>
				</div>
			</div>
			<div className='company-story'>
				<h2>Misyonumuz</h2>
				<p>
					Trendify olarak amacımız, modern ve sürdürülebilir alışveriş
					deneyimini herkes için erişilebilir hale getirmektir. Müşterilerimize
					yalnızca ürün sunmuyor, aynı zamanda bir yaşam tarzı öneriyoruz. Her
					adımımızda, çevreye duyarlı ve etik üretim standartlarını göz önünde
					bulunduruyoruz.
				</p>
				<p>
					Moda dünyasında yenilikçi çözümler geliştirmek ve müşterilerimize en
					iyi deneyimi sunmak için durmaksızın çalışıyoruz. Amacımız, sadece bir
					alışveriş platformu olmak değil, aynı zamanda kullanıcılarımız için
					ilham kaynağı olmaktır.
				</p>
				<h2>Hikayemiz</h2>
				<p>
					2024 yılında bir grup vizyoner girişimci tarafından İstanbul’da
					kurulan Trendify, başlarda küçük bir ekip ve sınırlı bir ürün
					yelpazesi ile faaliyet göstermeye başladı. Ancak kullanıcıların
					ihtiyaçlarına hızlı bir şekilde yanıt verme yeteneğimiz ve yenilikçi
					yaklaşımlarımız sayesinde kısa sürede büyüdük.
				</p>
				<p>
					Trendify olarak, kurulduğumuz günden bu yana, kullanıcılarımızı en
					yeni trendlerle buluşturmayı, onlara kaliteli ve uygun fiyatlı ürünler
					sunmayı kendimize misyon edindik. Bugün, dünya çapında binlerce mutlu
					müşterimizle büyümeye ve yenilikler sunmaya devam ediyoruz.
				</p>
			</div>
			<div className='faq-section'>
				<h2>Sıkça Sorulan Sorular</h2>
				<p>
					<strong>Soru:</strong> Siparişimi nasıl takip edebilirim?
				</p>
				<p>
					<strong>Cevap:</strong> Hesabınıza giriş yaparak "Siparişlerim"
					sekmesinden sipariş durumunuzu görüntüleyebilirsiniz.
				</p>
				<p>
					<strong>Soru:</strong> İade politikası nedir?
				</p>
				<p>
					<strong>Cevap:</strong> Ürünlerimizi teslim aldıktan sonra 14 gün
					içinde iade edebilirsiniz.
				</p>
			</div>
		</div>
	);
};

export default Contact;
