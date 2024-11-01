// components/TableRows.js
import React from 'react';

const TableRows = ({ data }) => {
  return (
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
            <td>{deviation.deviationID}</td>
            <td>{deviation.metaDevID}</td>
            <td>{deviation.title}</td>
            <td>{deviation.link}</td>
            <td>{deviation.published}</td>
            <td>{deviation.mature}</td>
            <td>{deviation.stats}</td>
            <td>{deviation.tierDeviationID}</td>
            <td>{deviation.downloadable}</td>
            <td>{deviation.tierName}</td>
            <td>{deviation.tierURL}</td>
            <td>{deviation.galleryName}</td>
            <td>{deviation.premiumGalleryID}</td>
            <td>{deviation.premType}</td>
            <td>{deviation.dollarPrice}</td>
            <td>{deviation.numSubs}</td>
            <td>{deviation.numViews}</td>
            <td>{deviation.thumbsLink}</td>
            <td>{deviation.matureLevel}</td>
            <td>{deviation.matureClass}</td>
            <td>{deviation.tags.join(', ')}</td>
            <td>{deviation.desc}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableRows;