CREATE TABLE Usuario (
    IdUsuario INTEGER PRIMARY KEY NOT NULL, -- Identificador do usu�rio
    Nome VARCHAR(100) NOT NULL,             -- Nome do usu�rio
    DataNascimento DATE NOT NULL,           -- Data de nascimento do usu�rio
    Email VARCHAR(100) NOT NULL,            -- Email do usu�rio
    Cidade VARCHAR(100) NOT NULL,           -- Cidade do usu�rio
    Endere�o VARCHAR(100) NOT NULL,         -- Endere�o do usu�rio
    Senha VARCHAR(100) NOT NULL             -- Senha do usu�rio
);

CREATE TABLE ContaBancaria (
    IdContaBancaria INTEGER PRIMARY KEY NOT NULL, -- Identificador da conta banc�ria
    IdUsuario INTEGER NOT NULL,                   -- Identificador do usu�rio da conta banc�ria
    Nome VARCHAR(100) NOT NULL,                   -- Nome de identifica��o do banco
    Ag�ncia VARCHAR(10) NOT NULL,                 -- C�digo da ag�ncia da conta
    Conta VARCHAR(15) NOT NULL,                   -- N�mero da conta banc�ria
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario) -- Chave estrangeira para a tabela Usuario
);

CREATE TABLE MovimentacaoContaBancaria (
    IdMovimentacaoContaBancaria INT PRIMARY KEY NOT NULL, -- Identificador das movimenta��es das contas banc�rias
    IdContaBancaria INT NOT NULL,                         -- Identificador da conta banc�ria
    DataMovimentacao DATE NOT NULL,                       -- Data de realiza��o das movimenta��es
    Descricao VARCHAR(100) NOT NULL,                      -- Descri��o da movimenta��o
    Valor DECIMAL(10, 2) NOT NULL,                        -- Valor da movimenta��o
    Tipo INT NOT NULL,                                    -- Tipo da movimenta��o: 1 - D�bito, 2 - Cr�dito
    FOREIGN KEY (IdContaBancaria) REFERENCES ContaBancaria(IdContaBancaria) -- Chave estrangeira para a tabela ContaBancaria
);

CREATE TABLE TipoMovimentacao (
    IdTipoMovimentacao INT PRIMARY KEY NOT NULL,   -- Identificador do tipo das movimenta��es
    Nome VARCHAR(50) NOT NULL                      -- Nome da movimenta��o
);

CREATE TABLE CategoriaDocumento (
    IdCategoriaDocumento INT PRIMARY KEY NOT NULL,   -- Identificador das categorias das contas a pagar/receber
    Nome VARCHAR(50) NOT NULL                        -- Nome da categoria
);


CREATE TABLE ContasPagar (
    IdContasPagar INT PRIMARY KEY NOT NULL,          -- Identificador das contas a pagar
    IdCategoriaDocumento INT NOT NULL,               -- Identificador da categoria desta conta a pagar
    IdUsuario INT NOT NULL,                          -- Identificador do usu�rio da conta a pagar
    Numero VARCHAR(100) NOT NULL,                    -- N�mero do documento a pagar
    DataVencimento DATE NOT NULL,                    -- Data de vencimento da conta
    DataAbertura DATE NOT NULL,                      -- Data de abertura da conta
    Descricao VARCHAR(100),                          -- Descri��o de detalhamento da conta
    Valor DECIMAL(10, 2) NOT NULL,                   -- Valor da conta
    FOREIGN KEY (IdCategoriaDocumento) REFERENCES CategoriaDocumento(IdCategoriaDocumento), -- Chave estrangeira para CategoriaDocumento
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario) -- Chave estrangeira para Usuario
);

CREATE TABLE MovimentacaoContaPagar (
    IdMovimentacaoContaPagar INT PRIMARY KEY NOT NULL, -- Identificador das movimenta��es das contas a pagar
    IdTipoMovimentacao INT NOT NULL,                   -- Identificador do tipo das movimenta��es
    IdContaPagar INT NOT NULL,                         -- Identificador das contas a pagar
    Valor DECIMAL(10, 2) NOT NULL,                     -- Valor da movimenta��o da conta a pagar
    DataMovimentacao DATE NOT NULL,                    -- Data da movimenta��o da conta a pagar
    Descricao VARCHAR(100),                            -- Descri��o da movimenta��o da conta a pagar
    FOREIGN KEY (IdTipoMovimentacao) REFERENCES TipoMovimentacao(IdTipoMovimentacao), -- Chave estrangeira para TipoMovimentacao
    FOREIGN KEY (IdContaPagar) REFERENCES ContasPagar(IdContasPagar) -- Chave estrangeira para ContasPagar
);

CREATE TABLE ContasReceber (
    IdContasReceber INT PRIMARY KEY NOT NULL,         -- Identificador das contas a receber
    IdCategoriaDocumento INT NOT NULL,                -- Identificador da categoria desta conta a receber
    IdUsuario INT NOT NULL,                           -- Identificador do usu�rio da conta a receber
    Numero VARCHAR(100) NOT NULL,                     -- N�mero do documento a receber
    DataVencimento DATE NOT NULL,                     -- Data de vencimento da conta
    DataAbertura DATE NOT NULL,                       -- Data de abertura da conta
    Descricao VARCHAR(100) NOT NULL,                  -- Descri��o de detalhamento da conta
    Valor DECIMAL(10, 2) NOT NULL,                    -- Valor da conta
    FOREIGN KEY (IdCategoriaDocumento) REFERENCES CategoriaDocumento(IdCategoriaDocumento), -- Chave estrangeira para CategoriaDocumento
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario) -- Chave estrangeira para Usuario
);

CREATE TABLE MovimentacaoContasReceber (
    IdMovimentacaoContaReceber INT PRIMARY KEY NOT NULL,  -- Identificador das movimenta��es das contas a receber
    IdTipoMovimentacao INT NOT NULL,                      -- Identificador do tipo das movimenta��es
    IdContaReceber INT NOT NULL,                           -- Identificador das contas a receber
    Valor DECIMAL(10, 2) NOT NULL,                         -- Valor da movimenta��o da conta a receber
    DataMovimentacao DATE NOT NULL,                        -- Data da movimenta��o da conta a receber
    Descricao VARCHAR(100),                                -- Descri��o da movimenta��o da conta a receber
    FOREIGN KEY (IdTipoMovimentacao) REFERENCES TipoMovimentacao(IdTipoMovimentacao), -- Chave estrangeira para TipoMovimentacao
    FOREIGN KEY (IdContaReceber) REFERENCES ContasReceber(IdContasReceber) -- Chave estrangeira para ContasReceber
);




