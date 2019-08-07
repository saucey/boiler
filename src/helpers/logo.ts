let CLIENT_ID = `${process.env.REACT_APP_CLIENT_ID}`;

export const getLogo = (): string => {
    CLIENT_ID = 'rg'
    
    // console.log(CLIENT_ID, 'client ID');
    switch (CLIENT_ID){
        case "23": return "/images/Logo.png";
        case "447": return "/images/LogoUniWales.png";
        case "rg": return "https://www.rgu.ac.uk/templates/g5_rgu/images/logo.png?5cefcaf4"
        default: return "/images/Logo.png";
    }   
};