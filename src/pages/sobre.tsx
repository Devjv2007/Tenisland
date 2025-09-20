

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Sobre Nossa Loja
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprometidos em oferecer a melhor experiência de compras online com produtos de qualidade e atendimento excepcional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">Nossa História</h2>
            <p className="text-gray-300 leading-relaxed">
              Fundada em 2025, nossa loja nasceu com o objetivo de democratizar o acesso à tecnologia de qualidade. Começamos como uma pequena iniciativa e hoje somos referência em vendas online, sempre priorizando a satisfação do cliente.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Acreditamos que a tecnologia deve ser acessível a todos, por isso trabalhamos constantemente para oferecer os melhores produtos com preços justos e um atendimento personalizado.
            </p>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">Nossa Missão</h2>
            <p className="text-gray-300 leading-relaxed">
              Proporcionar uma experiência de compra excepcional, oferecendo produtos de alta qualidade, entrega rápida e suporte completo aos nossos clientes.
            </p>
            <div className="bg-black  p-6 rounded-lg">
              <h3 className="text-xl font-medium text-white mb-3">Nossos Valores</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Qualidade em primeiro lugar
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Transparência em todas as relações
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Inovação constante
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Atendimento humanizado
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-black  rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-semibold text-white text-center mb-12">
            Central de Suporte
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black rounded-xl p-6 ">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-black  rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Central de Ajuda</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Encontre respostas para as perguntas mais frequentes sobre produtos, pedidos, entregas e muito mais.
              </p>
              <p className="text-sm text-gray-400 mb-3">
                • Como fazer um pedido<br/>
                • Rastreamento de entregas<br/>
                • Informações sobre produtos<br/>
                • Problemas técnicos
              </p>
            </div>

            <div className="bg-black rounded-xl p-6 ">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-black  rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Política de Privacidade</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Transparência total sobre como coletamos, usamos e protegemos suas informações pessoais.
              </p>
              <p className="text-sm text-gray-400 mb-3">
                • Coleta de dados<br/>
                • Uso de informações<br/>
                • Proteção de dados<br/>
                • Seus direitos
              </p>
            </div>

            <div className="bg-black rounded-xl p-6 ">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-black  rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Termos de Uso</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Condições gerais que regem o uso da nossa plataforma e a realização de compras.
              </p>
              <p className="text-sm text-gray-400 mb-3">
                • Condições de compra<br/>
                • Responsabilidades<br/>
                • Limitações de uso<br/>
                • Alterações nos termos
              </p>
            </div>

            <div className="bg-black rounded-xl p-6 ">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-black  rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Política de Devolução</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Processo simples e transparente para devoluções, trocas e reembolsos.
              </p>
              <p className="text-sm text-gray-400 mb-3">
                • Prazo para devolução: 30 dias<br/>
                • Produtos elegíveis<br/>
                • Como solicitar<br/>
                • Reembolso e trocas
              </p>
            </div>
          </div>
        </div>

        <div className="bg-black  rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-white mb-4">Entre em Contato</h2>
            <p className="text-gray-300">
              Nossa equipe está sempre pronta para ajudar você
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black  rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-300">contato@sualooja.com.br</p>
              <p className="text-gray-300">suporte@sualooja.com.br</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black  rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Telefone</h3>
              <p className="text-gray-300">(18) 99999-9999</p>
              <p className="text-gray-400 text-sm">Segunda a Sexta: 8h às 18h</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black  rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Localização</h3>
              <p className="text-gray-300">Presidente Prudente - SP</p>
              <p className="text-gray-400 text-sm">Atendimento online</p>
            </div>
          </div>

          <div className="mt-8 pt-8  text-center">
            <p className="text-gray-400">
              Horário de Atendimento: Segunda a Sexta das 8h às 18h | Sábado das 8h às 12h
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Por que Escolher Nossa Loja?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black  rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Melhores Preços</h3>
              <p className="text-gray-300 text-sm">Preços competitivos e promoções exclusivas</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black  rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Entrega Rápida</h3>
              <p className="text-gray-300 text-sm">Entregamos em todo o Brasil com agilidade</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black  rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Segurança</h3>
              <p className="text-gray-300 text-sm">Compra 100% segura e protegida</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black  rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Qualidade</h3>
              <p className="text-gray-300 text-sm">Produtos originais e de alta qualidade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
