

const Footer = () => {
  const paymentMethods = [
    {
      name: "Visa",
      src: "https://www.caixa.gov.br/PublishingImages/Cartoes/Black_Visa_300x195px.png",  
      alt: "Visa"
    },
    {
      name: "Mastercard",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3KzmVyd5iVP4AjfcOsrn6EN4-kv9kiw5oNg&s",
      alt: "Mastercard"
    },
    {
      name: "American Express",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVeZA16PJpsF71WMdfpynM8FYLoD8KHeQ-Qg&s",
      alt: "American Express"
    },
    {
      name: "PayPal",
      src: "https://bucket.utua.com.br/img/2025/03/518b3112-paypal-rebranded-blue-mc-2028-qbb145-g66vag-7vp8m6.png",
      alt: "PayPal"
    },
    {
      name: "Pix",
      src: "https://neofeed.com.br/wp-content/uploads/2020/10/PIX-1-1200x900.jpg",
      alt: "Pix"
    },
    {
      name: "Boleto",
      src: "https://storage.googleapis.com/public-hyb-com-br/site/img/receba-por-boleto-min.webp",
      alt: "Boleto"
    }
  ];

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">Sua Loja</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              A melhor experiência em compras online com produtos de qualidade.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/home" className="text-gray-300 hover:text-white transition-colors">Início</a></li>
              <li><a href="/sobre" className="text-gray-300 hover:text-white transition-colors">Produtos</a></li>
              <li><a href="/sobre" className="text-gray-300 hover:text-white transition-colors">Sobre</a></li>
              <li><a href="/sobre" className="text-gray-300 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>    


          <div>
            <h4 className="text-lg font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/sobre" className="text-gray-300 hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="/sobre" className="text-gray-300 hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="/sobre" className="text-gray-300 hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="/sobre" className="text-gray-300 hover:text-white transition-colors">Devolução</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p> contato@sualooja.com.br</p>
              <p> (18) 99999-9999</p>
              <p> Presidente Prudente - SP</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h4 className="text-sm font-medium text-gray-400 mb-3">Formas de Pagamento</h4>
              <div className="flex flex-wrap items-center gap-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-2 hover:scale-105 transition-transform duration-200"
                  >
                    <img
                      src={method.src}
                      alt={method.alt}
                      className="h-6 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>


            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Siga-nos:</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.160-1.507-.402-2.084-1.823-2.084-3.319 0-2.785 2.027-5.344 5.844-5.344 3.078 0 5.472 2.189 5.472 5.11 0 3.047-1.925 5.497-4.601 5.497-.9 0-1.748-.467-2.037-1.024l-.555 2.121c-.201.775-.747 1.745-1.112 2.34.835.259 1.73.398 2.652.398 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>


          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              © 2025 TenisLand. Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
