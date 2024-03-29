const useGenerateChipColor = (fieldType) => {
    let color;

    switch (fieldType) {
      case 'String':
        color = 'success'
        break;
      case 'Number': 
        color = 'secondary'
        break;
      case 'Boolean': 
        color = 'primary'
        break;
      case 'Date': 
        color = 'warning'
        break;
    }
    return color
}

export default useGenerateChipColor