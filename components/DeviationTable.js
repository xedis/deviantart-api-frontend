import React from 'react';
import Table from 'react-bootstrap/Table';

const DeviationTable = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Deviation ID</th>
          <th>Meta Dev ID</th>
          <th>Title</th>
          <th>Link</th>
          <th>Published</th>
          <th>Mature</th>
          <th>Stats</th>
          <th>Tier Deviation ID</th>
          <th>Downloadable</th>
          <th>Tier Name</th>
          <th>Tier URL</th>
          <th>Gallery Name</th>
          <th>Premium Gallery ID</th>
          <th>Prem Type</th>
          <th>Dollar Price</th>
          <th>Num Subs</th>
          <th>Num Views</th>
          <th>Thumbs Link</th>
          <th>Mature Level</th>
          <th>Mature Class</th>
          <th>Tags</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((deviation, index) => (
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
    </Table>
  );
};

export default DeviationTable;