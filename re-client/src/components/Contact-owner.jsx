import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactOwner({ singleListing }) {
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getOwner = async () => {
      try {
        const res = await fetch(`/api/user/${singleListing.userId}`);
        const data = await res.json();
        setOwner(data);
      } catch (error) {
        console.log(error);
      }
    };

    getOwner();
  }, [singleListing.userId]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      {owner && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{owner.username}</span> for{' '}
            <span className="font-semibold">
              {singleListing.name.toLowerCase()}
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="3"
            value={message}
            placeholder="Message"
            onChange={onChange}
            className="w-full border p-3 rounded-md outline-none"
          ></textarea>
          <Link
            to={`mailto:${owner.email}?subject=Regarding ${singleListing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
}

ContactOwner.propTypes = {
  singleListing: PropTypes.object.isRequired,
};
