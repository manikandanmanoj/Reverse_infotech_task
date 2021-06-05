import React  from "react";
import { styleConcat } from './ComponentHelper';
import { Typography } from '@material-ui/core';

export default function Text({ strike, noWrap, variant, lineHeight, component, size, transform, align, regular, bold, semibold, medium, weight, light, center, right, left, spacing=.1, height, color, style, children, ...props }) {



    const textStyles = [ 
        styles.medium,
        size && { fontSize: size },
        transform && { textTransform: transform },
        align && { textAlign: align },
        height && { lineHeight: height },
        spacing && { letterSpacing: spacing },
        weight && { fontWeight: weight },
        regular && styles.regular,
        bold && styles.bold,
        semibold && styles.semibold,
        light && styles.light,
        center && styles.center,
        right && styles.right,
        left && styles.left,
        noWrap && { whiteSpace: 'nowrap' },
        strike && { textDecoration: 'line-through' },
        lineHeight && { lineHeight: lineHeight },
        color && { color },
        { fontFamily: 'Poppins,Helvetica,Arial,sans-serif' },
        style
    ];

    return (
        <Typography variant={variant} component={component} style={styleConcat(textStyles)} {...props}>
            {children}
        </Typography>
    );
}


const styles = {
    // default style
    // variations
    regular: {
        // fontWeight: "Arial,sans-serif",
        // fontWeight:'Poppins,Helvetica,Arial,sans-serif'
    },
    bold: {
        fontWeight: "600",
    },
    semibold: {
        fontWeight: "500",
    },
    medium: {
        fontWeight: "400",
    },
    light: {
        fontWeight: "200",
    },
    // position
    center: { textAlign: "center" },
    right: { textAlign: "right" },
    left: { textAlign: "left" }
};