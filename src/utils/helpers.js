export const styleStatus = (status) => {
  return status.toLowerCase().split(' & ').join('_').split(' ').join('_');
};
export const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Options for formatting date with month, day, and year
  const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', dateOptions);

  // Options for formatting time with hour and minute
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

  // Determine if the date includes a time component
  const hasTime = date.getHours() !== 0 || date.getMinutes() !== 0;

  // Format the date based on the presence of time component
  if (hasTime) {
    return `${formattedDate.replace(',', '')} at ${formattedTime}`;
  } else {
    return formattedDate.replace(/, 2024/, ', 2024');
  }
};

export const MUItxtFieldStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px', // Custom border radius
    '& fieldset': {
      borderColor: 'var(--Colors-Neutral-300)', // Default border color
    },
    '&:hover fieldset': {
      borderColor: 'var(--Colors-Neutral-300)', // Hover border color
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--Colors-Neutral-300)', // Focus border color
      boxShadow: 'none', // Remove focus effect
    },
  },
};

export const formatNumber = (num) => {
  const [integer, decimal] = num.split('.');
  const formattedDecimal = decimal ? decimal.slice(0, 2) : '00';
  return `${integer}.${formattedDecimal.padEnd(2, '0')}`;
};
