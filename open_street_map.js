async function formatAddress(data) {
  const address = [];
  const details = [
    'state', 'state_district', 'county',
    'municipality', 'city', 'town', 'village',
    'city_district', 'district', 'borough', 'suburb', 'subdivision',
    'hamlet', 'croft', 'isolated_dwelling',
    'neighbourhood', 'allotments', 'quarter',
    'city_block', 'residential', 'farm', 'farmyard',
    'industrial', 'commercial', 'retail',
    'road'
  ];

  for (const detail of details) {
    if (data.hasOwnProperty(detail)) {
      if (detail === 'state') {
        if (data.hasOwnProperty('city') && data['city'].includes("Нижний Новгород")) {
          continue;
        }
      }

    if (detail === 'county') {
      if (data.hasOwnProperty('city') && data['county'].includes(data['city'])) {
        continue;
      }
      if (data.hasOwnProperty('town') && data['county'].includes(data['town'])) {
        continue;
      }
    }

    if (detail === 'city' || detail === 'town') {
      address.push(`г. ${data[detail]}`);
      continue;
    }

    if (detail === 'road') {
      if (data.hasOwnProperty('house_number')) {
        address.push(`${data['road']}, д. ${data['house_number']}`);
        continue;
      }
    }

      address.push(data[detail]);
    }
  }

    return address.join(', ');
  }

async function searchAddress(latitude, longitude) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  let address = 'г. Нижний Новгород, ул. , д.';

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${latitude},${longitude}&format=json&addressdetails=1`, {
      method: 'GET',
      headers: {
        'Referer': 'your_url',
        'accept-language': 'ru'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const json = await response.json();

    if (json && json.length > 0 && json[0].address) {
      address = await formatAddress(json[0].address);
    }
  } catch (error) {
    console.warn('Search address failed: ', error);
  }

  return address;
}
