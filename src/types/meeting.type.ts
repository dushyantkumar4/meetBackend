export interface IMeeting {
  meetingId: string; 
  hostId: string; 
  title:string;
  isActive: boolean;
  endedAt?: Date;
}

export interface IParticipant {
  meeting: string;
  user: string;
  isMuted: boolean;
  isVideoOn: boolean;
  joinedAt: Date;
  leftAt?: Date;
}