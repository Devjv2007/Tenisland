import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-6">404</h1>
      <p className="mb-4">Página não encontrada</p>
      <Link 
        to="/home" 
        className="text-blue-500 hover:underline"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
