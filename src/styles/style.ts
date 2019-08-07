// import glamorous, { GlamorousComponent } from 'glamorous'
// import InfiniteCalendar from 'react-infinite-calendar';
// import {Link as ReactRouterLink} from 'react-router-dom'

export const style = {
    appColors: { 
        primary: "rgb(44,56,126)",
        background1: "rgb(240,240,252)",
        backgroundbu: "rgb(252,240,240)",
        black: "rgb(0, 0, 0)",
        backgroundColor: "rgb(155, 102, 102)",
        secondary1TextColor : "rgb(155, 102, 102)",
        buttonColor : "rgb(155, 102, 102)",
        white: "rgb(255, 255, 255)",
        secondaryActionColor: "rgb(155, 102, 102)",
        borderColor: "rgb(155, 102, 102)"
     },
     sizes: { fontSize : 14}
};

//html elements
// export const H1 = glamorous.div({ color: 'RGB(225,225,225)', fontSize: '30px', padding: '10px 20px'});
// export const H2 = glamorous.div({ color: 'RGB(225,225,225)',fontSize: '22px', padding: '10px 20px'});
// export const H3 = glamorous.div({ color: 'RGB(225,225,225)',fontSize: '18px', padding: '10px 20px'});
// export const H4 = glamorous.div({ color: 'RGB(225,225,225)',fontSize: '15px', padding: '10px 20px'});
// export const H5 = glamorous.div({ color: 'RGB(225,225,225)',fontSize: '13px', padding: '10px 20px'});
// export const H6 = glamorous.div({ color: 'RGB(225,225,225)',fontSize: '11px', padding: '10px 20px'});
// export const PNormal = glamorous.div({ padding: '10px 20px', display: 'flex', justifyContent: 'flex-end'});
// export const PLight = glamorous.div({ padding: '10px 20px', display: 'flex', justifyContent: 'flex-end'});

// export const VerticalSpacer5 = glamorous.div({height: window.innerHeight * 0.05});
// export const VerticalSpacer10 = glamorous.div({height: window.innerHeight * 0.10});
// export const VerticalSpacer15 = glamorous.div({height: window.innerHeight * 0.15});
// export const VerticalSpacer20 = glamorous.div({height: window.innerHeight * 0.20});

//key screen style
// export const Header = glamorous.div({ //backgroundColor:'RGB(10,10,15)', 
// background:'radial-gradient(circle closest-corner at center 125px,#111,RGB(0,0,65) 40%)',color: 'RGB(245,245,245)', top:'0', width:'100%', height:'80px',
//     display: 'flex', flexFlow:'row wrap', justifyContent: 'center', alignItems: 'center', alignContent: 'center', borderBottom:'1px solid RGB(200,200,200)',
//     '@media(max-width: 500px)': { height:'50px' }, 
// });
// export const CompanyLogo = glamorous.img({height:50,
//     '@media(max-width: 500px)': { height:30 },
//     '@media screen and (min-width: 501px) and (max-width: 600px)': { height:40}
// });
// export const CancelLink: GlamorousComponent<ReactRouterLink & {}, ReactRouterLink> = glamorous(ReactRouterLink)({
//     position:'absolute',right:25, textDecoration:'none', color: 'white', fontSize:'0.9rem',fontFamily:'Panton W01 Light',
// '@media(max-width: 500px)': { fontSize:'0.7rem', textDecoration:'none', ':visited': {textDecoration: 'none'} }, 
// '@media screen and (min-width: 501px) and (max-width: 600px)': { fontSize:'0.85rem', ':visited': {textDecoration: 'none'}},
// ':hover': { color:'rgb(145,145,145)', cursor:'pointer'},
// ':visited': {textDecoration: 'none'}
// });

// export const BackgroundImage = glamorous.div({
//     minHeight:`${document.documentElement.clientHeight - 180}px`, 
//     height:'calc(100% - 180px)',
//     overflow:'hidden',
//     background:`url('/images/bgd.jpg') no-repeat center center`, 
//     backgroundSize:'cover',
//     '@media(max-width: 700px)': {    
//         minHeight:`${document.documentElement.clientHeight - 50}px`, 
//         height:'calc(100% - 50px)', }, 
// });
    
// export const MainMenu = glamorous.div({ padding: '10px 20px', display: 'flex', justifyContent: 'flex-end'});
// export const MainMenuItem = glamorous.div({ padding: '10px 20px', display: 'flex', justifyContent: 'flex-end'});



// //main elements
// export const GeneralHeaderWithUnderline = glamorous.span({fontSize: '1.6rem',color: 'RGB(225,225,225)', margin:'0 auto', padding: '80px 0px 25px 0px', 
//     borderBottom: '1px solid RGB(205,205,205, 0.5)', position:'relative', display:'block',
//     '&::before': { content: ` `, display: 'block', height:window.innerHeight * 0.05}, fontFamily:'Panton W01 Light',
//     '@media(max-width: 550px)': { 
//         // '&::after': { content: ` `, display: 'block', height:25, borderBottom: '5px solid RGB(205,205,205, 0.5)'},
//         padding: '5px 0px 25px 0px', fontSize: '1.2rem', borderBottom: '1px solid RGB(205,205,205, 0.5)', overflow: 'auto', textDecoration:'underline'}
// });
// export const GeneralHeaderWithUnderlineTaller = glamorous.span({fontSize: '1.6rem',color: 'RGB(225,225,225)', margin:'0 auto', padding: '25px 0px 25px 0px', 
//     borderBottom: '1px solid RGB(205,205,205, 0.5)', fontFamily:'Panton W01 Light', position:'relative', display:'block',
//     '@media(max-width: 550px)': { padding: '10px 0px 10px 0px', fontSize: '1.2rem', borderBottom: '1px solid RGB(205,205,205, 0.5)', textDecoration:'underline'}
// });

// // const cssShim: any = css;
// // const bounce = cssShim.keyframes({
// //         '0%': { transform: `translate(0px,20px)` },
// //         '100%': { transform: `translate(0px,0px)` }
// //  })
// export const LargeCenteredText = glamorous.span({margin:'0 auto', fontSize: '1.8rem', padding: '5px 20px',color: 'RGB(225,225,225)',textAlign:'center',
// fontFamily:'Panton Narrow W00 ExtraLight',
// '@media(max-width: 900px)': { fontSize:'1.2rem'},});
// // ,animation: `${bounce} 0.25s ease`});
// export const CenteredText = glamorous.div({margin:'0 auto', textAlign:'center', fontSize: '1.2rem', padding: '5px 20px',color: 'RGB(225,225,225)',
// '@media(max-width: 550px)':{fontSize: '0.9rem'}});
// export const CenteredTextWithUnderline = glamorous.div({margin:'0 auto', textAlign:'center', fontSize: '1.2rem', padding: '5px 5px',color: 'RGB(225,225,225)',
// '@media(max-width: 550px)':{fontSize: '0.9rem', paddingBottom:5},
//  '&::after': {
//      content: `''`, display: 'block', margin: '0 auto', width: '90px', paddingTop: '30px', borderBottom: '1px solid rgb(200,200,200,0.5)'}
// });

// //general graphical elements
// export const NextButton = glamorous.button({type: 'button', background:`transparent url('/icons/arrow.png') no-repeat top`,
//     backgroundSize:'70px 70px', width:'80', height:80, border:0, cursor:'pointer', marginTop: '35px',
//     margin: '0 auto', display:'block', flex:'0 0 auto',
// ':focus':{outline:'none'}
// });
// export const PayButton = glamorous.button({type: 'button', background:`transparent url('/icons/pay.png') no-repeat top`,
//     backgroundSize:'70px 70px', width:'80', height:80, border:0, cursor:'pointer', marginTop: '35px',
//     margin: '0 auto', display:'block', flex:'0 0 auto',
// ':focus':{outline:'none'}
// });

//step 1
// export const CityGrid = glamorous.div({display:'grid', gridTemplateColumns: '1fr 1fr 1fr', justifyItems: 'center', justifyContent:'center', 
//     alignContent: 'center', gridGap:'20px 5px', '@media(max-width: 550px)': { gridTemplateColumns: '1fr' },
//     '@media screen and (min-width: 551px) and (max-width: 1000px)': { gridTemplateColumns: '1fr 1fr' },
// });
// export const FullGrid = glamorous.div({
//     '@media screen and (min-width: 401px) and (max-width: 550px)': {':last-child':{borderBottom:'1px solid RGB(200,200,200,0.5)'}},
//     '@media(max-width: 400px)': {':last-child':{borderBottom:'1px solid RGB(200,200,200,0.5)'}}});
// export const SingleWordGrid = glamorous.a({height:60, justifySelf:'center', alignSelf:'center',

// });
// export const City = glamorous.div({color:'rgb(245,245,245)', textTransform:'uppercase', fontSize:'1.5rem', textDecoration:'none', textAlign:'center',padding:'10px 0px',
//       ':hover': { color:'rgb(145,145,145)', cursor:'pointer', borderTop:'1px solid RGB(200,200,200,0.5)', borderBottom:'1px solid RGB(200,200,200,0.5)'} ,
//       '@media screen and (min-width: 401px) and (max-width: 550px)': { fontSize:'1.1rem', borderTop:'1px solid RGB(200,200,200,0.5)',borderBottom:'1px solid RGB(200,200,200,0.5)' },
//       '@media(max-width: 400px)': { fontSize:'0.8rem', borderTop:'1px solid RGB(200,200,200,0.5)',borderBottom:'1px solid RGB(200,200,200,0.5)' },
//     });
// export const GridText = glamorous.div({color:'rgb(245,245,245)', textTransform:'uppercase', fontSize:'1.5rem', textDecoration:'none', textAlign:'center',padding:'10px 0px',
//       ':hover': { color:'rgb(145,145,145)', cursor:'pointer', borderTop:'1px solid RGB(200,200,200,0.5)', borderBottom:'1px solid RGB(200,200,200,0.5)'} ,
//       '@media screen and (min-width: 401px) and (max-width: 550px)': { fontSize:'1.1rem', borderTop:'1px solid RGB(200,200,200,0.5)' },
//       '@media(max-width: 400px)': { fontSize:'0.8rem', borderTop:'1px solid RGB(200,200,200,0.5)' },
//     });
// export const SubText = glamorous.div({textTransform:'lowercase', fontSize:'1.2rem' , textDecoration:'none', textAlign:'center',padding:'5px 0px',
// fontFamily:'Panton Narrow W00 ExtraLight I',
// '@media screen and (min-width: 401px) and (max-width: 550px)': { fontSize:'0.9rem' },
// '@media(max-width: 400px)': { fontSize:'0.7rem' },
// }); 

// //step 2
// export const SiteInfo = glamorous.div({ position:'absolute', right:0, top:0, height: '100%', width: 500, backgroundColor:'white',color:'rgb(30,30,30)',
//     display: 'flex', flexFlow:'column nowrap', justifyContent:'flex-start', alignItems:'center',
//     '@media(max-width: 550px)': { width: 280 },
//     '@media screen and (min-width: 551px) and (max-width: 900px)': { width: 400 },
// });
// export const CloseButton = glamorous.a({position:'absolute', top:5, right:5, height:20, width:20});
// export const SiteInfoSite = glamorous.div({flex:'1 1 0',
// display:'flex', flexFlow:'column nowrap', justifyContent:'space-evenly', alignItems:'center' });
// export const SiteInfoSiteTitle = glamorous.div({ flex:'0 1 auto', fontSize: '1.8rem',  padding:'5px', fontFamily:'Panton Narrow W00 SemiBold',
//     '@media(max-width: 550px)': { fontSize: '1rem' },
//     '@media screen and (min-width: 551px) and (max-width: 900px)': { fontSize: '1.5rem' },
// });
// export const SiteInfoSiteAddress = glamorous.div({ flex:'0 1 auto',
//     '@media(max-width: 550px)': { fontSize:'0.8rem'},  });
// export const SiteInfoSiteTown = glamorous.div({ flex:'0 1 auto',  //marginTop:10, 
// paddingBottom:13, borderBottom: '1px solid RGB(205,205,205, 0.5)',
//     '@media(max-width: 550px)': { fontSize:'0.8rem', paddingBottom:1, borderBottom: '1px solid white'} });
// export const SiteInfoSiteSpaces = glamorous.div({ flex:'0 1 auto',
//     '@media(max-width: 550px)': { fontSize:'0.8rem'}, });

// export const SiteInfoOpeningHours = glamorous.div({flex:'1 1 0', backgroundColor:'rgb(220,220,220)',width:'100%', 
//     //display: 'flex', flexFlow:'column nowrap', justifyContent:'space-around',alignItems: 'center'
// });
// export const SiteInfoOpeningHoursTitle = glamorous.div({ flex:'1 0 1', fontSize: '1.8rem', textAlign:'center', margin:'15px auto',fontFamily:'Panton Narrow W00 SemiBold',
// '@media(max-width: 550px)': { fontSize: '1rem' },
// '@media screen and (min-width: 551px) and (max-width: 900px)': { fontSize: '1.5rem' },
// });
// export const SiteInfoOpeningHoursBox = glamorous.div({width:'100%', 
// display: 'flex', flexFlow:'column nowrap', justifyContent:'flex-start',alignItems: 'center', });
// export const SiteInfoOpeningHoursRow = glamorous.div({flex:'1 1 20',display: 'flex', flexFlow:'row nowrap', width:'100%', });
// export const SiteInfoOpeningHoursDay = glamorous.div({ width:'40%', paddingLeft:'20%',  
//     '@media(max-width: 550px)': { paddingLeft:15, fontSize:'0.8rem'}, });
// export const SiteInfoOpeningHoursHours = glamorous.div({ width:'60%', textAlign:'center',
//     '@media(max-width: 550px)': { fontSize:'0.8rem'}, });

// //step 4
// export const ImageIcon = glamorous.img({display:'inline-block', height:'30px', width:'30px', paddingLeft:3, marginRight:10,  marginBottom:0, 
// '@media(max-width: 550px)': { height:'15px', width:'15px',paddingLeft:2, marginRight:6, marginBottom:-3,}});


// // export const FrequencyGrid = glamorous.div({display:'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', justifyItems: 'center', justifyContent:'space-evenly', 
// //     alignContent: 'space-around', gridGap:'20px 15px'});
// // export const SingleGrid = glamorous.a({height:60, justifySelf:'center', alignSelf:'center'});
// // export const Frequency = glamorous.div({color:'rgb(245,245,245)', textTransform:'uppercase', fontSize:22, textDecoration:'none', textAlign:'center'});

// //step 5
// export const NumberSpacesInput: GlamorousComponent<React.HTMLProps<HTMLInputElement>, React.HTMLProps<HTMLInputElement>> = glamorous.input({margin: '0 auto', display:'block', 
// height:50, textAlign:'center', fontSize:'1.4rem', width:200,
// boxShadow: 'none', borderColor:'1px solid RGB(200,200,200,0.5)', borderRadius:5, color:'white', backgroundColor:'transparent',
// '@media(max-width: 550px)': { fontSize:'1.2rem', height:50}});

// //step 7
// export const VrmGrid = glamorous.div({width:'100%', 
// display: 'flex', flexFlow:'column nowrap', justifyContent:'center',alignItems: 'center', });
// export const VrmGridRow = glamorous.div({ display: 'flex', flexFlow:'row nowrap', width:450, justifyContent: 'space-between', height:60, position: 'relative',
// '@media(max-width: 550px)': { width: '100%', height:20}, });
// export const VrmGridInput = glamorous.input({ display:'block', height:50, textAlign:'center', fontSize:'1.4rem', padding:'5px,0px',
// borderColor:'1px solid RGB(200,200,200,0.5)', borderRadius:5, color:'white', backgroundColor:'transparent', width:200,
// flex: '0 1 auto',  position: 'absolute',  left:'50%', transform: 'translateX(-50%)',
//  '@media(max-width: 550px)': { width: 120},
// });
// export const VrmGridDeleteButton = glamorous.span({type: 'submit', background:`transparent url('/icons/deleteitem.png') no-repeat top`,
// backgroundSize:'50px 50px', width:50, height:50, border:'none', cursor:'pointer', outline:'none', display:'block', flex:'0 0 auto', marginLeft:'auto', marginRight:7,
// '@media(max-width: 550px)': { backgroundSize:'30px 30px', width:30, height:30},});
// export const VrmGridAddButton = glamorous.span({type: 'submit', background:`transparent url('/icons/additem.png') no-repeat top`,
// backgroundSize:'50px 50px', width:50, height:50, border:'none', cursor:'pointer', outline:'none', display:'block', flex:'0 0 auto', marginRight:7,
// '@media(max-width: 550px)': { backgroundSize:'30px 30px', width:30, height:30},});


// //other
// export const CardItem = glamorous.div({ padding: '10px 20px', display: 'flex', justifyContent: 'flex-end'});
// export const CardItemSelected = glamorous.div({ padding: '10px 20px', display: 'flex', justifyContent: 'flex-end'});
// export const CardItemHeading = glamorous.div({ padding: '10px 20px', display: 'flex', justifyContent: 'flex-end'});
// export const CardItemSubHeading = glamorous.div({ padding: '10px 20px', display: 'flex', justifyContent: 'flex-end'});

// export const SimpleSelectionGrid = glamorous.div({ padding: '10px 20px', display: 'flex', justifyContent: 'flex-end'});
// export const SimpleSelectionGridItem = glamorous.div({ padding: '10px 20px', display: 'flex', justifyContent: 'flex-end'});
// export const SimpleSelectionGridItemSelected = glamorous.div({ padding: '10px 20px', display: 'flex', justifyContent: 'flex-end'});

// //Cost Summary step
// export const Table = glamorous.table({width:'450', margin:'0 auto',
//     '@media(max-width: 550px)': { width:'350'}
// });
// export const TableHeader = glamorous.div({margin:'0 auto', textAlign:'center', color:'white', fontFamily:'Panton Narrow W00 Bold' });
// export const TableRow = glamorous.tr({width:450, margin:'0 auto', color:'white'});
// export const TableRowDescription = glamorous.td({width:370,
//     '@media(max-width: 550px)': { fontSize:'0.8rem'}});
// export const TableRowAmount = glamorous.td({width:80,  textAlign:'right',
// '@media(max-width: 550px)': { fontSize:'0.8rem'}});

// export const Calendar = glamorous(InfiniteCalendar)({width:1200,height:330});
// export const CenterInMiddleOfScreen = glamorous.div({position:'fixed',left:'50%',top:'50%', zIndex:999});

// export const SpinnerButton = glamorous.div({  position: 'absolute', cursor: 'default',zIndex: 2, backgroundColor: '#ccc', width: '14.5px',
//     textAlign: 'center',margin: 0, pointerEvents: 'none', height: 25, lineHeight: 25});

//     //purchase footer
// export const PurchaseFooterBackground = glamorous.div({position:'fixed',bottom:'0', width:'100%', height:'100px',
// background:'radial-gradient(circle closest-corner at center 125px,#111,RGB(0,0,35) 50%)', color: 'RGB(245,245,245)', borderTop:'1px solid RGB(200,200,200)'});
// export const PurchaseFooterList = glamorous.ul({display: 'flex', flexFlow:'row wrap', justifyContent: 'center', alignItems: 'center', alignContent: 'center'
// });
// export const PurchaseFooterListItem = glamorous.li({ border:'1px solid white', borderRadius:'5px', padding: '2px 2px', flex: '1, 0, auto', 
//     marginRight: '10px', listStyleType: 'none', textDecoration:'none',color: 'RGB(245,245,245)', height:40, marginTop: '6px', //backgroundColor:'RGB(10,10,15)',
//     background:'radial-gradient(circle top-right at center 125px,#111,RGB(0,0,45) 40%)',
//     ':visited': { textDecoration:'none', color: 'RGB(245,245,245)' } 
// });
// export const PurchaseFooterItemLink: GlamorousComponent<ReactRouterLink & {}, ReactRouterLink> = glamorous(ReactRouterLink)({
//     textDecoration:'none', color: 'RGB(245,245,245)', display: 'flex', flexFlow:'row nowrap', alignItems: 'center',
//     ':hover': { textDecoration:'none', color: 'RGB(245,245,245)'}});
// export const PurchaseFooterItemIcon = glamorous.img({ display:'inline-block', paddingLeft:'2px', height:'30px', width:'30px', flex: '1, 0, auto'});
// export const PurchaseFooterItemText = glamorous.div({ padding: '5px 10px', fontFamily:'Panton Narrow W00 Light'});
// export const PurchaseFooterItemWideIcon = glamorous.img({ display:'inline-block', paddingLeft:'2px', paddingTop:2, height:'30px', width:'82px', flex: '1, 0, auto'});

// export const PurchaseFooterHelp = glamorous.a({display:'block', width:'100%', textAlign:'center', marginTop:'-3px', padding:'6px 0px 0px 0px', color: 'RGB(245,245,245)'
//     , alignItems: 'center', fontFamily:'Panton Narrow W00 ExtraLight'});

// export const UnderText = glamorous.div({color:'white',margin:'0 auto', textAlign:'center'});
// export const Under = glamorous.div({ position: 'relative',  height: 1, display:'block'});
// export const RootDiv = glamorous.div({position: 'relative',  width: '100%',  height: '100vh',  display: 'flex',
//     flexDirection: 'column',  justifyContent: 'space-around'});

// export const SignUpInput = glamorous.input({ display:'block', height:50, textAlign:'center', fontSize:'1.4rem', padding:'5px,0px', margin:'3px auto',
// borderColor:'1px solid RGB(200,200,200,0.5)', borderRadius:5, color:'white', backgroundColor:'transparent', width:340,
// flex: '0 1 auto'//,  '@media(max-width: 550px)': { width: 120},
// });