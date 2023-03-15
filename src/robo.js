const wppconnect = require('@wppconnect-team/wppconnect');

var userStages = [];

wppconnect.create({
    session: 'whatsbot',
    autoClose: false,
    puppeteerOptions: { args: ['--no-sandbox'] }
})
    .then((client) =>
        client.onMessage((message) => {
            console.log('Mensagem digitada pelo usuário: ' + message.body);
            stages(client, message);
        }))
    .catch((error) =>
        console.log(error));

function stages(client, message) {
    stage = userStages[message.from];
    switch (stage) {
        case 'Nome':
            const nome = message.body;
            sendWppMessage(client, message.from, 'Obrigado, ' + nome);
            sendWppMessage(client, message.from, 'Digite seu *CPF*:');
            userStages[message.from] = 'CPF';
            break;
        case 'CPF':
            const cpf = message.body;
            sendWppMessage(client, message.from, 'Obrigado por informar seu CPF: ' + cpf);
            userStages[message.from] = 'Menu';
            break;
        case 'Menu':
            const menu = message.body;
            sendWppMessage(client, message.from, 'Escolha uma das opções abaixo:'+ menu);
            sendMessageOptions(
                '1 - Teste',
                '2 - Teste2',
                {
                    quotedMessageId: reply,
                    }
                )
                .then((result) => {
                    console.log(result);
                })
                .catch((e) => {
                console.log(e);
                });
                userStages[message.from] = 'Fim';
            break;
        case 'Fim':
            const fim = message.body;
            sendWppMessage(Client, message.from, 'Fim!'+ Fim)
        default:
            console.log('*Usuário atual* from:' + message.from);
            sendWppMessage(client, message.from, 'Bem vindo ao Robô de testes! Digite seu *NOME*:');
            userStages[message.from] = 'Nome';
    }
}
function sendWppMessage(client, sendTo, text) {
    client
        .sendText(sendTo, text)
        .then((result) => {
            // console.log('SUCESSO: ', result); 
        })
        .catch((erro) => {
            console.error('ERRO: ', erro);
        });
}
