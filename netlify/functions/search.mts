import type { Context } from "@netlify/functions";

const headers = {
	"Access-Control-Allow-Origin" : "*",
	"Access-Control-Allow-Headers": "Content-Type",
};

export default async (req: Request, context: Context) => {

  //
  // CORS Preflight Handling
  //
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers,
    });
  }

  try {
    // grab query params
    const params = context.url.searchParams;
    const api_key = Netlify.env.get('GIANT_BOMB_API_KEY');

    if (!api_key) {
      throw "NO API KEY CONFIGURED"
    }

    params.set('api_key', api_key);

    console.log("params: ", params.toString())
    
    // send req to giant bomb api
    const response = await fetch(`https://www.giantbomb.com/api/search?${params.toString()}`, {
      method: 'GET',
    });

    const json = await response.json();
    
    // TODO: store response in caching layer
    // This is a good improvement, to keep api key from being overused, but may be outside the scope I have time for today.

    // send response to f/e
    return new Response(JSON.stringify(json));
  }
  catch (err) {
    console.error('error: ', err);
    return new Response('error submitting request', {
      status: 500,
    })
  }
}
