import { isBlank, isValidEmail, escapeHtml, computeJoursInclusive, parseLikedBy, parseComments } from './index';

describe('isBlank', () => {
  it('treats empty and whitespace-only strings as blank', () => {
    expect(isBlank('')).toBe(true);
    expect(isBlank('   ')).toBe(true);
    expect(isBlank('\t\n')).toBe(true);
  });

  it('treats strings with visible content as non-blank', () => {
    expect(isBlank('a')).toBe(false);
    expect(isBlank('  a  ')).toBe(false);
  });
});

describe('isValidEmail', () => {
  it('accepts well-formed addresses', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('  user@example.com  ')).toBe(true);
    expect(isValidEmail('first.last@sub.domain.fr')).toBe(true);
  });

  it('rejects malformed addresses', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('missing-domain@')).toBe(false);
    expect(isValidEmail('@missing-local.com')).toBe(false);
    expect(isValidEmail('spaces in@example.com')).toBe(false);
  });
});

describe('escapeHtml', () => {
  it('escapes the five HTML-significant characters', () => {
    expect(escapeHtml(`<script>alert('x')</script> & "quoted"`)).toBe(
      '&lt;script&gt;alert(&#39;x&#39;)&lt;/script&gt; &amp; &quot;quoted&quot;'
    );
  });

  it('returns an empty string for null-ish input', () => {
    expect(escapeHtml('')).toBe('');
  });
});

describe('computeJoursInclusive', () => {
  it('counts both boundary days inclusively', () => {
    expect(computeJoursInclusive('2026-01-01', '2026-01-01')).toBe(1);
    expect(computeJoursInclusive('2026-01-01', '2026-01-05')).toBe(5);
  });

  it('returns undefined when dates are missing, invalid, or reversed', () => {
    expect(computeJoursInclusive('', '2026-01-05')).toBeUndefined();
    expect(computeJoursInclusive('2026-01-05', '')).toBeUndefined();
    expect(computeJoursInclusive('not-a-date', '2026-01-05')).toBeUndefined();
    expect(computeJoursInclusive('2026-01-05', '2026-01-01')).toBeUndefined();
  });
});

describe('parseLikedBy', () => {
  it('parses a JSON array of emails', () => {
    expect(parseLikedBy('["a@x.com","b@x.com"]')).toEqual(['a@x.com', 'b@x.com']);
  });

  it('returns an empty array for missing, malformed, or non-array JSON', () => {
    expect(parseLikedBy(undefined)).toEqual([]);
    expect(parseLikedBy('not json')).toEqual([]);
    expect(parseLikedBy('{"a":1}')).toEqual([]);
  });
});

describe('parseComments', () => {
  it('parses a JSON array of comment objects', () => {
    const raw = JSON.stringify([{ user: 'A', email: 'a@x.com', text: 'hello', date: '2026-01-01' }]);
    expect(parseComments(raw)).toEqual([{ user: 'A', email: 'a@x.com', text: 'hello', date: '2026-01-01' }]);
  });

  it('filters out entries without a text field', () => {
    const raw = JSON.stringify([{ user: 'A' }, { text: 'ok' }]);
    expect(parseComments(raw)).toEqual([{ text: 'ok' }]);
  });

  it('returns an empty array for missing or malformed JSON', () => {
    expect(parseComments(undefined)).toEqual([]);
    expect(parseComments('not json')).toEqual([]);
  });
});
