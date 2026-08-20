
// Error message function
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
if (error && typeof error === "object" && "message" in error) {
  return String(error.message);
}
if (typeof error === "string") {
  return error;
}
return "An unknown error occurred.";
};



// Language Percentahe Function

interface langProps {
  [name:string] : number;
}


export const  LangPercentage=(languageProps:langProps) => {
  let byteTotal=0;
  for (const [name, number] of Object.entries(languageProps))
  {
    byteTotal+=number;

  }
  for (const [name, number] of Object.entries(languageProps))
  {
    let newVal=(number/byteTotal) * 100;
    newVal=Number(newVal.toFixed(2));

    languageProps[name]= newVal;

  }

  return languageProps
}