class Error {
    constructor(MFU){
        this.MFU = MFU;
        this.name = 'clipboard'
    }

    Copy() {
        alert('Error al copiar, por favor espera...');
        
        alert('Notificación enviada, por favor, considera copiar y pegar manualmente lo siguiente a whatsapp para tu pedido:');
        console.error(this.MFU);
    }
}

export default Error