import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #FEFEFE;
    --purple: #5B21B6;
    --red: #DC2626;

    --gray-light: #E9E9E9;
    --gray-medium: #969CB3;
    --gray-dark: #363F5F;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 4;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content {
    width: 100%;
    max-width: 430px;
    background: var(--background);
    padding: 3rem;
    position: relative;
    border-radius: 0.25rem;
  }

  .close-modal {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }

  .rbc-toolbar .rbc-toolbar-label {
  font-size: 1.5rem;
  }

  .rbc-today {
    background-color: #EDE9FE !important;
  }

  .rbc-event, .rbc-background-event, .rbc-selected {
    background-color: #5B21B6 !important;
    padding: 4px 10px;
    margin: 2px 0;

    &:focus {
      outline: 5px auto #4C1D95 !important;
    }
  }

  .rbc-toolbar button {
    color: var(---gray-dark);
    margin: 1rem 1.2rem;
    padding: 0.375rem 3rem;

    &:hover {
      box-shadow: inset 0 3px 5px rgb(237, 233, 254 / 13%);      
      color: #4C1D95;
      background-color: #EDE9FE;
      border-color: #4C1D95;
      transition: 200ms;
    }
    &:focus {
      box-shadow: inset 0 3px 5px rgb(237, 233, 254 / 13%);      
      color: #4C1D95;
      background-color: #EDE9FE;
      border-color: #4C1D95;
      font-weight: 500;
    }
  }

  .rbc-toolbar button:active:hover, 
  .rbc-toolbar button:active:focus, 
  .rbc-toolbar button.rbc-active:hover, 
  .rbc-toolbar button.rbc-active:focus  {

    &:hover {
      box-shadow: inset 0 3px 5px rgb(237, 233, 254 / 13%)!important;      
      color: #4C1D95;
      background-color: #EDE9FE;
      border-color: #4C1D95;      
    }
    &:focus {
      box-shadow: inset 0 3px 5px rgb(237, 233, 254 / 13%)!important;      
      color: #4C1D95;
      background-color: #EDE9FE;
      border-color: #4C1D95;
      font-weight: 500;
    }    
  }

  .rbc-toolbar button:active, 
  .rbc-toolbar button.rbc-active {
    box-shadow: inset 0 3px 5px rgb(237, 233, 254 / 13%)!important;      
      color: var(---purple);
      background-color: #EDE9FE;
      border-color: var(---purple);
      font-weight: 500;
    }
  .rbc-show-more {
    color: #4C1D95;    
  }
`;