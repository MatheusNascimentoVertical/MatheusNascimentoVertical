#!/bin/bash
set -e

echo "🚀 Iniciando Dashboard de Gestão de Sistemas..."

# Install backend dependencies
echo "📦 Instalando dependências do backend..."
cd "$(dirname "$0")/backend"
npm install

# Install frontend dependencies
echo "📦 Instalando dependências do frontend..."
cd "../frontend"
npm install

echo ""
echo "✅ Dependências instaladas!"
echo ""
echo "Para iniciar o sistema, abra dois terminais:"
echo ""
echo "  Terminal 1 (Backend):"
echo "    cd dashboard/backend && npm run dev"
echo ""
echo "  Terminal 2 (Frontend):"
echo "    cd dashboard/frontend && npm run dev"
echo ""
echo "Acesse: http://localhost:5173"
