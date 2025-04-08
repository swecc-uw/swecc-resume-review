import { parseAnyDate } from '../localization';
import type { Member, RawMemberData } from '../types';
import { devPrint } from '../utils';
import api from './api';

export function deserializeMember({
  first_name: firstName,
  last_name: lastName,
  grad_date: gradDate,
  discord_username: discordUsername,
  resume_url: resumeUrl,
  discord_id: discordId,
  profile_picture_url: profilePictureUrl,
  created,
  ...rest
}: RawMemberData): Member {
  return {
    ...rest,
    firstName,
    lastName,
    discordUsername,
    resumeUrl,
    discordId,
    profilePictureUrl,
    created: parseAnyDate(created),
    gradDate: gradDate ? parseAnyDate(gradDate) : undefined,
  };
}

export async function getCurrentUser(): Promise<Member> {
  const url = '/members/profile/';
  const res = await api.get(url);

  devPrint('Current user:', res);

  if (res.status !== 200) throw new Error('Failed to get current user');

  if (!Object.prototype.hasOwnProperty.call(res, 'data'))
    throw new Error('Failed to get current user');

  return deserializeMember(res.data);
}
