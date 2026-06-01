/**
 * COMPONENTE: ClientCard
 * 
 * Exibe as informações de um cliente em formato de card
 * Inclui botões de editar e deletar
 */

const ClientCard = ({ client, onEdit, onDelete }) => {
  // Função para formatar a data de cadastro
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Cabeçalho do card - cor baseada no tipo de cliente */}
      <div className={`px-4 py-3 ${
        client.clientType === 'particular' ? 'bg-blue-500' : 'bg-green-500'
      } text-white`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{client.clientType === 'particular' ? '👤' : '🏢'}</span>
            <span className="font-semibold">{client.name}</span>
          </div>
          <span className="text-xs bg-white bg-opacity-30 px-2 py-1 rounded-full">
            ID: {client.id}
          </span>
        </div>
      </div>
      
      {/* Corpo do card */}
      <div className="p-4 space-y-2">
        {/* Email */}
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-sm">📧</span>
          <span className="text-sm truncate">{client.email}</span>
        </div>
        
        {/* Telefone */}
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-sm">📞</span>
          <span className="text-sm">{client.phone}</span>
        </div>
        
        {/* Endereço (se existir) */}
        {client.address && (
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-sm">📍</span>
            <span className="text-sm truncate">{client.address}</span>
          </div>
        )}
        
        {/* Data de cadastro */}
        <div className="flex items-center gap-2 text-gray-400 text-xs pt-2 border-t">
          <span>📅 Cadastro: {formatDate(client.createdAt)}</span>
        </div>
      </div>
      
      {/* Botões de ação */}
      <div className="px-4 py-3 bg-gray-50 flex justify-end gap-2">
        <button
          onClick={() => onEdit(client)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-1"
        >
          ✏️ Editar
        </button>
        <button
          onClick={() => onDelete(client.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-1"
        >
          🗑️ Excluir
        </button>
      </div>
    </div>
  );
};

export default ClientCard;