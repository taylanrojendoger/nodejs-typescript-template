class HealthService {

    public checkHealth(): object {
        return {
            data: {
                message: 'OK'
            }
        };
    }

}

export default HealthService;