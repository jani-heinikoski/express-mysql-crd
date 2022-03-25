module.exports = async function (mysqlConnection) {
    const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS PELAAJA(
        PELAAJA_ID int not null primary key auto_increment,
        PELAAJA_NIMI  varchar(40) not null,
        PELAAJA_SEURA  varchar(20) not null
    );`;
    await mysqlConnection.execute(CREATE_TABLE);
};
