import React from 'react';
import QRCode from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';
function QRCodeTable({ accounts }) {
  const token = uuidv4();
  return (
    <div>
      <table>
        <thead>
          <tr>
         
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              
              <td>
                <QRCode 
                value={(`${account.URL}/Login?tableName=${encodeURIComponent(account.tableName)}&password=${encodeURIComponent(account.password)}`)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QRCodeTable;
