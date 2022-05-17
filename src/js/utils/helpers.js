// Helpers.
export const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{3,150}$/;

export const emailRegex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

export const resetText = text => {
    return text.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

export const toCapitalize = text => {
    return text.trim().toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

export const toBrReal = number => {

    number = Number(number) / 100;
    
    return Number(number).toLocaleString("pt-BR", {
        style: "currency",
        currency: 'BRL',
        minimumFractionDigits: 2
    });

}