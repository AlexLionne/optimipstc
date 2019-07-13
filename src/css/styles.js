import colors from './colors'


const settings = {
    colorPrimary: colors.colorPrimary,
    textColorOnPrimary: colors.textColorOnPrimary,
    colorAccent: colors.colorAccent,
    colorAccentDark: colors.colorAccentDark
};


const styles = {


    ariane: {
        padding: '0!important',
        backgroundColor: 'white!important'
    },
    info_page: {
        paddingTop: '42px',
        paddingLeft: '15%',
        paddingRight: '15%'
    }, link: {
        color: settings.colorAccentDark
    },
    map: {
        paddingTop: '42px',
        marginBottom: '24px',
    },
    map_filter: {
        marginBottom: '24px'
    },
    subtitle: {
        fontSize: '80%',
        fontWeight: 'italic'
    },
    cardItem: {
        marginTop: '24px',
        cursor: 'pointer'
    },
    cardMap: {
        float: 'right',
        width: '30%',
        height: '100%',
        overflowY: 'scroll'
    },
    cardHeader: {
        cursor: 'pointer',
        fontWeight: 'bold'
    }, inline: {
        display: 'inline',
    },
    input_autocomplete: {
        width: '100%',
    },
    marginBottom: {
        marginBottom: '24px'
    },
    w_100: {
        float: 'right',
        width: '100%'
    }, dropdown: {
        width: '77vw'
    },
    ps_options: {
        width: '30%',
        position: 'absolute',
        top: '10%',
        right: '78px',
        margin: 'auto',
        border: 'none',
        borderRadius: '6px',
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"
    },
    card_detail: {
        zIndex: 100,
        width: '18%',
        position: 'absolute',
        top: '41%',
        left: '1%',
        margin: 'auto',
        border: 'none',
        borderRadius: '6px',
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    },


};
export default styles;