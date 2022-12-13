USE containers_fullstack_api;

CREATE TABLE
    movimentacoes (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        tipo VARCHAR(50) NOT NULL,
        dataInicio VARCHAR(20),
        dataFim VARCHAR(20),
        container INT NOT NULL,
        FOREIGN KEY (container) REFERENCES containers(id)
    );

INSERT INTO
    movimentacoes (
        tipo,
        dataInicio,
        dataFim,
        container
    )
VALUES (
        'Embarque',
        '11/12/2022',
        '12/12/2022',
        1
    ), (
        'Descarga',
        '10/12/2022',
        '11/12/2022',
        2
    );
