import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaBan, FaChevronRight, FaRegFileAlt } from 'react-icons/fa';

function ProfileSidebar() {
  return (
    <div style={{ width: '280px', backgroundColor: '#ffffff', height: '100vh', borderLeft: '1px solid #f0f2f5', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      
      {/* 1. Profile Head Details */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 20px', borderBottom: '1px solid #f0f2f5' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#7b57ff', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '28px', marginBottom: '12px' }}>
          E
        </div>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700', color: '#1c1e21' }}>Emily Johnson</h3>
        <span style={{ fontSize: '13px', color: '#45bd62', fontWeight: '600' }}>Active Now</span>
      </div>

      {/* 2. User Information Section */}
      <div style={{ padding: '20px', borderBottom: '1px solid #f0f2f5' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#8e9297', textTransform: 'uppercase' }}>User Information</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <FaPhoneAlt style={{ color: '#65676b' }} />
          <span style={{ fontSize: '14px', color: '#1c1e21' }}>+1 (555) 019-2834</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FaEnvelope style={{ color: '#65676b' }} />
          <span style={{ fontSize: '14px', color: '#1c1e21', wordBreak: 'break-all' }}>emily.j@connecthub.com</span>
        </div>
      </div>

      {/* 3. Shared Media Section (Photos/Videos Layout) */}
      <div style={{ padding: '20px', borderBottom: '1px solid #f0f2f5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', cursor: 'pointer' }}>
          <h4 style={{ margin: 0, fontSize: '14px', color: '#8e9297', textTransform: 'uppercase' }}>Shared Media</h4>
          <FaChevronRight style={{ color: '#8e9297', fontSize: '12px' }} />
        </div>
        {/* Responsive Grid looking like screenshot */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {[1, 2, 3].map((num) => (
            <div key={num} style={{ width: '100%', height: '70px', backgroundColor: '#f0f2f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#8e9297', fontWeight: '600' }}>
              Media {num}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Shared Files Section */}
      <div style={{ padding: '20px', borderBottom: '1px solid #f0f2f5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', cursor: 'pointer' }}>
          <h4 style={{ margin: 0, fontSize: '14px', color: '#8e9297', textTransform: 'uppercase' }}>Shared Files</h4>
          <FaChevronRight style={{ color: '#8e9297', fontSize: '12px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', cursor: 'pointer' }}>
          <FaRegFileAlt style={{ color: '#7b57ff', fontSize: '18px' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#1c1e21' }}>Project_Brief.pdf</span>
            <span style={{ fontSize: '11px', color: '#8e9297' }}>2.4 MB</span>
          </div>
        </div>
      </div>

      {/* 5. Privacy & Block Button */}
      <div style={{ padding: '20px', marginTop: 'auto' }}>
        <button style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#ffebe9',
          color: '#f02849',
          border: 'none',
          borderRadius: '10px',
          fontWeight: '700',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}>
          <FaBan /> Block Emily Johnson
        </button>
      </div>

    </div>
  );
}

export default ProfileSidebar;
          
