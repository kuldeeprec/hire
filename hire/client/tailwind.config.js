module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      borderRadius: {
        "2sm": "0.063rem"
      },
      colors: {
        bluelagoon: "#0E7DED",
        carbon: "#000000",
        dove: "#FFFFFF",
        lightblue: "#F3F8FE",
        persianblue: "#1640E7",
        silver: "#AAAAAA",
        sandstone: "#CCCCCC",
        tomato: "#FF6666"
      },
      fontFamily: {
        "inter": ["Inter", "sans-serif"]
      },
      fontSize: {
        "2xs": ".5rem",
        "3xs": ".25rem",
        "4xs": ".125rem",
        "1xl": "1.313rem",
        "title": "4rem",
        "subtitle": "2.5rem",
        "mob-subtitle": "2rem"
      },
      gridTemplateColumns: {
        "1.5/1": "1.5fr 1fr"
      },
      height: {
        "34": "8.5rem",
        "4.5/5": "90%",
        "84": "21rem",
        "max": "max-content"
      },
      lineHeight: {
        "5.5": "1.35rem"
      },
      opacity: {
        "38": "0.38",
        "54": "0.54",
        "66": "0.66"
      },
      padding: {
        "18": "4.5rem"
      },
      width: {
        "23": "5.75rem",
        "27": "6.75rem",
        "34": "8.5rem",
        "42": "10.5rem",
        "46": "11.5rem",
        "89": "22.25rem",
        "95": "23.75rem",
        "124": "31rem",
        "8.5/12": "70%",
        "max": "max-content",
        "186": "11.625rem"
      },
      maxWidth: {
        "2xs": "18rem",
        "3xs": "16rem",
        "4xs": "14rem"
      },
      minWidth: {
        "4": "1rem"
      },
      screens: {
        "xs": "320px"
      },
      margin: {
        "4.5": "1.125rem",
        "7.5": "1.875rem",
        "26": "6.5rem"
      },
      boxShadow: {
        inp: "0 0 0 2px rgba(15, 80, 50, 0.2)",
        notification: "0px 2px 4px rgba(0, 0, 0, 0.1)"
      }
    },
  },  
  variants: {
    extend: {
      backgroundColor: ["active"],
      borderWidth: ["last"],
      margin: ["last"],
      textColor: ["active"]
    }
  },
  plugins: [],
}
