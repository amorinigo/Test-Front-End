export const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{3,150}$/;

export const emailRegex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

// Receives ' PANTALÓN ', return 'pantalon'.
export const resetText = text => {
    return text.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

// Receives 'CINTO MARRÓN', return 'Cinto marrón'.
export const toCapitalize = text => {
    return text.trim().toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

// Receives a Number like 29900, return that number divided by 100 in Brazilian Real format. 'R$ 299,00'.
export const toBrReal = number => {

    number = Number(number) / 100;
    
    return Number(number).toLocaleString("pt-BR", {
        style: "currency",
        currency: 'BRL',
        minimumFractionDigits: 2
    });

}