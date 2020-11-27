const apikey = `XLnBDcGPMs0sr8FSnZm65shjagLxZGqJnLLaQgjHZ2Z4U8uKQt66HTRY0dQmKDgMdpAnqDiwQCDKMMXseXLHPVjKj-AlGaMrT5QqMKvwqMf4-H9Ek8Lq-wVaSm62X3Yx`;

export const Yelp = {
    search(term, location, sortBy) {
        return fetch(
            `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
            {
                headers: {
                    Authorization: `Bearer ${apikey}`,
                },
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                if (jsonResponse.businesses) {
                    return jsonResponse.businesses.map((business) => {
                        return {
                            id: business.id,
                            imageSrc: business.image_url,
                            name: business.name,
                            address: business.location.address1,
                            city: business.location.city,
                            state: business.location.state,
                            zipCode: business.location.zip_code,
                            lat: business.coordinates.latitude,
                            lon: business.coordinates.longitude,
                            category: business.categories[0].title,
                            rating: business.rating,
                            reviewCount: business.review_count,
                            url: business.url,
                        };
                    });
                }
            });
    },

    async autocomplete(prefix) {
        const req = await fetch(
            `https://api.allorigins.win/raw?url=https://www.yelp.com/location_suggest/v2?prefix=${prefix}`
        );
        const res = await req.json();

        return res;
    },
};
