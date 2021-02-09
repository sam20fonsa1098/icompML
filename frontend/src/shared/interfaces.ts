export interface serie {
    name: string,
    data: Array<Number>
}

export interface user {
    user_id?: string,
    class_id?: string,
    assessment_id?: string,
    id?: string
}

export interface gradeProps {
    syntax_grade: Number,
    gradeStatus: Array<serie>
}

export interface chartProps {
    options: Array<string>,
    series: Array<serie>,
    title?: string,
    type: any
}

export interface userChartProps {
    codeMetricsSeries: Array<serie>,
    codeMetricsOptions: Array<string>,
    submitedMetricsOptions: Array<string>,
    submitedMetricsSeries: Array<serie>,
    keyboardMetricsOptions: Array<string>,
    keyboardMetricsSeries: Array<serie>
    timeMetricsOptions: Array<string>,
    timeMetricsSeries: Array<serie>,
    gradeStatus: Array<serie>
}

export interface loadingProps {
    type?: any,
    color?: any,
    height?: Number,
    width?: Number
}

export interface predictionsMetrics {
    predictionMetricsOptions: any,
    predictionMetricsSeries: any,
    maxSessions: number
}

export interface probabilityMetrics {
    gradePredictionsOptions: Array<string>,
    gradePredictions: Array<number>,
    maxSessions: number
}

export interface questionsMetrics {
    list: Array<any>,
}
