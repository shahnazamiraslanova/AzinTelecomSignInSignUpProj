
import { createUseStyles } from 'react-jss';
import sizes from '../../assets/styles/abstracts/sizes';
// import fonts from '../../assets/styles/abstracts/fonts';
// import colors from '../../assets/styles/abstracts/color';
import colors from './../../assets/styles/abstracts/color';

const styles = {
    homeMain:{
        width:'80%',
        position:'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: '3',
        backgroundColor:'white',
        height:'85vh',
        borderRadius: `${sizes.borderRadiusMain + 'px'}`,
        boxShadow: '0px 4px 4px 0px #00000040',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
        
    },
    homeChild:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:'32%',
        marginTop:'150px'
    },

    titleHome:{
        fontSize: '3em',
        marginTop: '8px',
        marginBottom: '10px'
    },
    userName:{
        fontSize: '3em',
        marginTop: '8px',
        color:'#e48700',
        marginBottom:'100px'

    }
 
   
    
}

export const useHomeMainStyle = createUseStyles(styles);
