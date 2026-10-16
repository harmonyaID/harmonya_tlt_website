export const countTotalBeds = (rooms: any = []) =>
    rooms.reduce((total, room) => total + (Number(room?.bedCount) || 0), 0)
