import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<footer className='footer'>
			<div className='footer-container'>
				{/* Company Info Section */}
				<div className='footer-section'>
					<h2 className='footer-title'>Trendify</h2>
					<p className='footer-description'>
						Trendify, müşterilerimize en iyi alışveriş deneyimini sunmayı
						hedefleyen yenilikçi bir e-ticaret platformudur. Kaliteli ürünler,
						uygun fiyatlar ve müşteri memnuniyetine odaklanarak sektörde fark
						yaratıyoruz.
					</p>
				</div>

				{/* Quick Links Section */}
				<div className='footer-section'>
					<h3 className='footer-title'>Hızlı Linkler</h3>
					<ul className='footer-links'>
						<li>
							<Link to='/' className='footer-link'>
								Ana Sayfa
							</Link>
						</li>
						<li>
							<Link to='/shop' className='footer-link'>
								Mağaza
							</Link>
						</li>
						<li>
							<Link to='/contact' className='footer-link'>
								Hakkımızda
							</Link>
						</li>
						<li>
							<Link to='/contact' className='footer-link'>
								İletişim
							</Link>
						</li>
					</ul>
				</div>

				{/* Contact Info Section */}
				<div className='footer-section'>
					<h3 className='footer-title'>Bize Ulaşın</h3>
					<p className='footer-contact'>
						<strong>Adres:</strong> Barbaros Mahallesi, İstanbul, Türkiye <br />
						<strong>Telefon:</strong> +90 212 123 45 67 <br />
						<strong>E-posta:</strong> info@trendify.com
					</p>
				</div>

				{/* Social Media Section */}
				<div className='footer-section'>
					<h3 className='footer-title'>Bizi Takip Edin</h3>
					<div className='footer-socials'>
						<a
							href='https://facebook.com'
							className='footer-social-link'
							target='_blank'
							rel='noopener noreferrer'
						>
							<i className='fab fa-facebook-f'></i>
						</a>
						<a
							href='https://twitter.com'
							className='footer-social-link'
							target='_blank'
							rel='noopener noreferrer'
						>
							<i className='fab fa-twitter'></i>
						</a>
						<a
							href='https://instagram.com'
							className='footer-social-link'
							target='_blank'
							rel='noopener noreferrer'
						>
							<i className='fab fa-instagram'></i>
						</a>
						<a
							href='https://linkedin.com'
							className='footer-social-link'
							target='_blank'
							rel='noopener noreferrer'
						>
							<i className='fab fa-linkedin-in'></i>
						</a>
					</div>
				</div>
			</div>

			{/* Bottom Footer */}
			<div className='footer-bottom'>
				<p className='footer-copy'>© 2024 Trendify. Tüm hakları saklıdır.</p>
				<ul className='footer-bottom-links'>
					<li>
						<Link to='/contact' className='footer-link'>
							Gizlilik Politikası
						</Link>
					</li>
					<li>
						<Link to='/contact' className='footer-link'>
							Kullanım Koşulları
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
