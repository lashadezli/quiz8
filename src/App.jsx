import React, { useState } from 'react';
import './App.css';
import arrow from './assets/images/icon-arrow.svg'

const AgeCalculator = () => {
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [age, setAge] = useState({ years: null, months: null, days: null });
  const [errors, setErrors] = useState({ day: '', month: '', year: '' });

  const validateInputs = () => {
    let hasErrors = false;
    const newErrors = { day: '', month: '', year: '' };

    const birthDayInt = parseInt(birthDay);
    const birthMonthInt = parseInt(birthMonth);
    const birthYearInt = parseInt(birthYear);

    if (isNaN(birthDayInt) || birthDayInt < 1 || birthDayInt > 31) {
      newErrors.day = 'Must be a valid day';
      hasErrors = true;
    }

    if (isNaN(birthMonthInt) || birthMonthInt < 1 || birthMonthInt > 12) {
      newErrors.month = 'Must be a valid month';
      hasErrors = true;
    }

    if (isNaN(birthYearInt) || birthYearInt > currentYear) {
      newErrors.year = 'Must be in the past';
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const calculateAge = () => {
    if (!validateInputs()) {
      return;
    }

    const birthDayInt = parseInt(birthDay);
    const birthMonthInt = parseInt(birthMonth);
    const birthYearInt = parseInt(birthYear);

    const currentDate = new Date();
    const birthDate = new Date(birthYearInt, birthMonthInt - 1, birthDayInt);

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
      const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
      days += lastMonth.getDate();
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    setAge({ years, months, days });
  };

  return (
    <div className='Main'>
      <div className="Upper">
      <label>
          <p className="day">Day</p>
        <input className='TypeIn'
          type="text"
          placeholder='DD'
          value={birthDay}
          onChange={(e) => setBirthDay(e.target.value)}
          style={{ borderColor: errors.day ? 'red' : '' }}
        />
        <div style={{ color: 'red' }}>{errors.day}</div>
      </label>
      <label>
       <p className="day">Month</p>
        <input className='TypeIn'
          type="text"
          placeholder='MM'
          value={birthMonth}
          onChange={(e) => setBirthMonth(e.target.value)}
          style={{ borderColor: errors.month ? 'red' : '' }}
        />
        <div style={{ color: 'red' }}>{errors.month}</div>
      </label>
      <label>
       <p className="day">Year</p>
        <input className='TypeIn'
          type="text"
          placeholder='YYYY'
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          style={{ borderColor: errors.year ? 'red' : '' }}
        />
        <div style={{ color: 'red' }}>{errors.year}</div>
      </label>
      </div> 
      
      <div className="card-button">
        <button onClick={calculateAge}>
          <img src={arrow} alt="Icon" />
        </button>
      </div>


      <div className='Calculated'>
      <p className='Results'>
          <span className="Placeholder">{age.years !== null ? age.years : '--'}</span> years
      </p>
       
      <p className='Results'>
          <span className="Placeholder">{age.months !== null ? age.months : '--'}</span> months
      </p>
      
      <p className='Results'>
          <span className="Placeholder">{age.days !== null ? age.days : '--'}</span> days
      </p>
      </div>
    </div>
  );
};

export default AgeCalculator;

