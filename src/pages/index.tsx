import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_LOCALITIES } from '../queries/postageQueries';
import { Notification, Locality } from '@/types';

const initialErrors = {
  postcode: '',
  suburb: '',
  state: '',
};

export default function Home() {
  const [formData, setFormData] = useState({
    postcode: '',
    suburb: '',
    state: '',
  });
  const [inputErrors, setInputErrors] = useState({ ...initialErrors });
  const [notification, setNotification] = useState<Notification>({
    message: '',
    type: 'success',
  });

  useEffect(() => {
    // Reset errors when the user types in the corresponding field
    setInputErrors((prevInputErrors) => ({
      ...prevInputErrors,
      postcode: '',
      suburb: '',
      state: '',
    }));
  }, [formData.postcode, formData.suburb, formData.state]);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...initialErrors };

    if (!formData.postcode.trim()) {
      newErrors.postcode = 'Postcode is required';
      isValid = false;
    }

    if (!formData.suburb.trim()) {
      newErrors.suburb = 'Suburb is required';
      isValid = false;
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
      isValid = false;
    }

    setInputErrors(newErrors);
    return isValid;
  };

  const [handleSearch, { loading, data, error }] = useLazyQuery(GET_LOCALITIES, {
    variables: {
      q: formData.suburb,
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (validateForm()) {
      handleSearch();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  useEffect(() => {
    if (data) {
      const localityData: Locality[] = data.getLocalities.locality;
      if (localityData && localityData.length > 0) {
        const postcodes = localityData.map((loc: Locality) => loc.postcode);
        const states = localityData.map((loc: Locality) => loc.state);

        if (
          postcodes.includes(Number(formData.postcode)) &&
          states.includes(formData.state)
        ) {
          setNotification({
            message: 'The postcode, suburb, and state input are valid.',
            type: 'success',
          });
        } else {
          if (!postcodes.includes(Number(formData.postcode))) {
            setNotification({
              message: `The postcode ${formData.postcode} does not match the suburb ${formData.suburb}`,
              type: 'error',
            });
          }
          if (!states.includes(formData.state)) {
            setNotification({
              message: `The suburb ${formData.suburb} does not exist in the state ${formData.state}`,
              type: 'error',
            });
          }
        }
      } else {
        setNotification({
          message: `Invalid suburb ${formData.suburb}`,
          type: 'error',
        });
      }
    }

    if (error) {
      setNotification({
        message: error.message,
        type: 'error',
      });
    }
  }, [data, error, formData.postcode, formData.state]);

  return (
    <main className='flex flex-col items-center justify-between gap-y-8 p-8 md:p-24'>
      <img
        src='https://images.lawpath.com.au/2022/09/lawpath-logo.svg'
        alt='Lawpath logo'
        className='h-auto w-[180px]'
      />
      <h1 className='text-[42px] text-center font-semibold text-blue'>
        Australia Address Validation
      </h1>
      <form
        className='flex flex-col w-[100%] sm:w-[480px] lg:w-[640px]'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          placeholder='Enter the Postcode'
          value={formData.postcode}
          onChange={(event) => handleChange('postcode', event.target.value)}
          className={classNames(
            'border-2 border-blue rounded-md p-2 text-center',
            inputErrors.postcode && 'border-red-700'
          )}
        />
        <p className='text-red-700'>{inputErrors.postcode}</p>

        <input
          type='text'
          placeholder='Enter the Suburb'
          value={formData.suburb}
          onChange={(event) => handleChange('suburb', event.target.value)}
          className={classNames(
            'border-2 border-blue rounded-md p-2 text-center mt-6',
            inputErrors.suburb && 'border-red-700'
          )}
        />
        <p className='text-red-700'>{inputErrors.suburb}</p>

        <input
          type='text'
          placeholder='Enter the State'
          value={formData.state}
          onChange={(event) => handleChange('state', event.target.value)}
          className={classNames(
            'border-2 border-blue rounded-md p-2 text-center mt-6',
            inputErrors.state && 'border-red-700'
          )}
        />
        <p className='text-red-700'>{inputErrors.state}</p>

        <button
          type='submit'
          className='bg-blue-light hover:bg-blue text-white w-fit rounded-md px-6 py-4 mx-auto hover:bg-blue-700 mt-6'
        >
          {loading ? 'Verifying' : 'Verify Address'}
        </button>
      </form>
      {notification.message && (
        <div
          className={classNames(
            'w-[100%] sm:w-[480px] lg:w-[640px] text-center text-white p-2 border rounded-lg',
            notification.type === 'success'
              ? 'bg-green border-green'
              : 'bg-rose-600 border-rose-600'
          )}
        >
          {notification.message}
        </div>
      )}
    </main>
  );
}
