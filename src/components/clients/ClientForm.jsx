/**
 * COMPONENTE: ClientForm
 * 
 * Formulário para cadastrar ou editar um cliente
 */

import { useState, useEffect } from 'react';
import { validateEmail, validateRequired } from '../../utils/validators';

const ClientForm = ({ initialData, onSubmit, onCancel }) => {
  // Estados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clientType: 'particular',
    address: ''
  });
  
  // Estados de validação
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Se tiver dados iniciais (edição), preenche o formulário
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        clientType: initialData.clientType || 'particular',
        address: initialData.address || ''
      });
    }
  }, [initialData]);

  // Atualiza um campo específico do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Valida todos os campos antes de enviar
  const validateForm = () => {
    const newErrors = {};
    
    const nameValidation = validateRequired(formData.name, 'Nome');
    if (!nameValidation.isValid) newErrors.name = nameValidation.message;
    
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) newErrors.email = emailValidation.message;
    
    const phoneValidation = validateRequired(formData.phone, 'Telefone');
    if (!phoneValidation.isValid) newErrors.phone = phoneValidation.message;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envia o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Prepara os dados para salvar
    const clientData = {
      ...formData,
      updatedAt: Date.now()
    };
    
    // Se for novo cliente, adiciona createdAt
    if (!initialData) {
      clientData.createdAt = Date.now();
    } else {
      clientData.createdAt = initialData.createdAt;
      clientData.id = initialData.id;
    }
    
    await onSubmit(clientData);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto">
        {/* Cabeçalho */}
        <div className={`px-6 py-4 ${initialData ? 'bg-yellow-500' : 'bg-blue-500'} text-white`}>
          <h3 className="text-lg font-semibold">
            {initialData ? '✏️ Editar Cliente' : '➕ Novo Cliente'}
          </h3>
        </div>
        
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite o nome completo"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@exemplo.com"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          {/* Telefone */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Telefone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          
          {/* Tipo de Cliente */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tipo de Cliente
            </label>
            <select
              name="clientType"
              value={formData.clientType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="particular">👤 Particular</option>
              <option value="empresa">🏢 Empresa / Frota</option>
            </select>
          </div>
          
          {/* Endereço (opcional) */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Endereço (opcional)
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Rua, número, bairro, cidade..."
              rows="3"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 ${initialData ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50`}
            >
              {isSubmitting ? 'Salvando...' : (initialData ? '✏️ Atualizar' : '💾 Salvar')}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;