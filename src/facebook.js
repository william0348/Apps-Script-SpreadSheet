import fetch from 'node-fetch';

const FACEBOOK_GRAPH_BASE_URL = 'https://graph.facebook.com/';

/**
 * Fetch the Facebook share metrics for a given URL.
 *
 * @param {string} url - Fully qualified URL to inspect.
 * @returns {Promise<{url: string, shareCount: number, engagement: object|null}>}
 */
export async function getFacebookShares(url) {
  if (!url) {
    throw new Error('Missing `url` query parameter.');
  }

  const normalizedUrl = normalizeUrl(url);

  const requestUrl = new URL(FACEBOOK_GRAPH_BASE_URL);
  requestUrl.searchParams.set('id', normalizedUrl);
  requestUrl.searchParams.set('fields', 'engagement');

  const response = await fetch(requestUrl, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorBody = await safeJson(response);
    const error = new Error(`Facebook Graph API error: ${response.status} ${response.statusText}`);
    error.details = errorBody;
    throw error;
  }

  const payload = await response.json();

  const engagement = payload?.engagement ?? null;
  const shareCount =
    (engagement && typeof engagement.share_count === 'number' && engagement.share_count) ||
    (payload?.share?.share_count ?? 0);

  return {
    url: normalizedUrl,
    shareCount,
    engagement,
  };
}

function normalizeUrl(input) {
  try {
    // Attempt to parse as URL. If protocol missing, default to https.
    const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(input);
    const normalized = hasProtocol ? input : `https://${input}`;
    const url = new URL(normalized);
    url.hash = '';
    return url.toString();
  } catch (error) {
    throw new Error(`Invalid URL provided: ${input}`);
  }
}

async function safeJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
