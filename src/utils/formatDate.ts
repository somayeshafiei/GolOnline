const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('fa-IR');
  return formattedDate;
};

export default formatDate;
