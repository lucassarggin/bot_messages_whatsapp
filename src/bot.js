const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect.create({
    session: 'whatsbot',
    autoClose: false,
    puppeteerOptions: { args: ['--no-sandbox'] }
})
    .then((client) =>
    
        client.onMessage((message) => {
        
            console.log('Mensagem digitada pelo usuário: ' + message.body);
            
            client.sendText(message.from, 'Olá, isto é um teste')
                .then((result) => {
                    console.log('Pong retornado: ', result); 
                })
                .catch((erro) => {
                    console.error('ERRO: ', erro);
                });
        }))
        
    .catch((error) =>
        console.log(error));