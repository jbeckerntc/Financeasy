CREATE TABLE Usuario (
    IdUsuario INTEGER PRIMARY KEY NOT NULL, -- Identificador do usuário
    Nome VARCHAR(100) NOT NULL,             -- Nome do usuário
    DataNascimento DATE NOT NULL,           -- Data de nascimento do usuário
    Email VARCHAR(100) NOT NULL,            -- Email do usuário
    Cidade VARCHAR(100) NOT NULL,           -- Cidade do usuário
    Endereço VARCHAR(100) NOT NULL,         -- Endereço do usuário
    Senha VARCHAR(100) NOT NULL             -- Senha do usuário
);

CREATE TABLE ContaBancaria (
    IdContaBancaria INTEGER PRIMARY KEY NOT NULL, -- Identificador da conta bancária
    IdUsuario INTEGER NOT NULL,                   -- Identificador do usuário da conta bancária
    Nome VARCHAR(100) NOT NULL,                   -- Nome de identificação do banco
    Agência VARCHAR(10) NOT NULL,                 -- Código da agência da conta
    Conta VARCHAR(15) NOT NULL,                   -- Número da conta bancária
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario) -- Chave estrangeira para a tabela Usuario
);

CREATE TABLE MovimentacaoContaBancaria (
    IdMovimentacaoContaBancaria INT PRIMARY KEY NOT NULL, -- Identificador das movimentações das contas bancárias
    IdContaBancaria INT NOT NULL,                         -- Identificador da conta bancária
    DataMovimentacao DATE NOT NULL,                       -- Data de realização das movimentações
    Descricao VARCHAR(100) NOT NULL,                      -- Descrição da movimentação
    Valor DECIMAL(10, 2) NOT NULL,                        -- Valor da movimentação
    Tipo INT NOT NULL,                                    -- Tipo da movimentação: 1 - Débito, 2 - Crédito
    FOREIGN KEY (IdContaBancaria) REFERENCES ContaBancaria(IdContaBancaria) -- Chave estrangeira para a tabela ContaBancaria
);

CREATE TABLE TipoMovimentacao (
    IdTipoMovimentacao INT PRIMARY KEY NOT NULL,   -- Identificador do tipo das movimentações
    Nome VARCHAR(50) NOT NULL                      -- Nome da movimentação
);

CREATE TABLE CategoriaDocumento (
    IdCategoriaDocumento INT PRIMARY KEY NOT NULL,   -- Identificador das categorias das contas a pagar/receber
    Nome VARCHAR(50) NOT NULL                        -- Nome da categoria
);


CREATE TABLE ContasPagar (
    IdContasPagar INT PRIMARY KEY NOT NULL,          -- Identificador das contas a pagar
    IdCategoriaDocumento INT NOT NULL,               -- Identificador da categoria desta conta a pagar
    IdUsuario INT NOT NULL,                          -- Identificador do usuário da conta a pagar
    Numero VARCHAR(100) NOT NULL,                    -- Número do documento a pagar
    DataVencimento DATE NOT NULL,                    -- Data de vencimento da conta
    DataAbertura DATE NOT NULL,                      -- Data de abertura da conta
    Descricao VARCHAR(100),                          -- Descrição de detalhamento da conta
    Valor DECIMAL(10, 2) NOT NULL,                   -- Valor da conta
    FOREIGN KEY (IdCategoriaDocumento) REFERENCES CategoriaDocumento(IdCategoriaDocumento), -- Chave estrangeira para CategoriaDocumento
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario) -- Chave estrangeira para Usuario
);

CREATE TABLE MovimentacaoContaPagar (
    IdMovimentacaoContaPagar INT PRIMARY KEY NOT NULL, -- Identificador das movimentações das contas a pagar
    IdTipoMovimentacao INT NOT NULL,                   -- Identificador do tipo das movimentações
    IdContaPagar INT NOT NULL,                         -- Identificador das contas a pagar
    Valor DECIMAL(10, 2) NOT NULL,                     -- Valor da movimentação da conta a pagar
    DataMovimentacao DATE NOT NULL,                    -- Data da movimentação da conta a pagar
    Descricao VARCHAR(100),                            -- Descrição da movimentação da conta a pagar
    FOREIGN KEY (IdTipoMovimentacao) REFERENCES TipoMovimentacao(IdTipoMovimentacao), -- Chave estrangeira para TipoMovimentacao
    FOREIGN KEY (IdContaPagar) REFERENCES ContasPagar(IdContasPagar) -- Chave estrangeira para ContasPagar
);

CREATE TABLE ContasReceber (
    IdContasReceber INT PRIMARY KEY NOT NULL,         -- Identificador das contas a receber
    IdCategoriaDocumento INT NOT NULL,                -- Identificador da categoria desta conta a receber
    IdUsuario INT NOT NULL,                           -- Identificador do usuário da conta a receber
    Numero VARCHAR(100) NOT NULL,                     -- Número do documento a receber
    DataVencimento DATE NOT NULL,                     -- Data de vencimento da conta
    DataAbertura DATE NOT NULL,                       -- Data de abertura da conta
    Descricao VARCHAR(100) NOT NULL,                  -- Descrição de detalhamento da conta
    Valor DECIMAL(10, 2) NOT NULL,                    -- Valor da conta
    FOREIGN KEY (IdCategoriaDocumento) REFERENCES CategoriaDocumento(IdCategoriaDocumento), -- Chave estrangeira para CategoriaDocumento
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario) -- Chave estrangeira para Usuario
);

CREATE TABLE MovimentacaoContasReceber (
    IdMovimentacaoContaReceber INT PRIMARY KEY NOT NULL,  -- Identificador das movimentações das contas a receber
    IdTipoMovimentacao INT NOT NULL,                      -- Identificador do tipo das movimentações
    IdContaReceber INT NOT NULL,                           -- Identificador das contas a receber
    Valor DECIMAL(10, 2) NOT NULL,                         -- Valor da movimentação da conta a receber
    DataMovimentacao DATE NOT NULL,                        -- Data da movimentação da conta a receber
    Descricao VARCHAR(100),                                -- Descrição da movimentação da conta a receber
    FOREIGN KEY (IdTipoMovimentacao) REFERENCES TipoMovimentacao(IdTipoMovimentacao), -- Chave estrangeira para TipoMovimentacao
    FOREIGN KEY (IdContaReceber) REFERENCES ContasReceber(IdContasReceber) -- Chave estrangeira para ContasReceber
);




